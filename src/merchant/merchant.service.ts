import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { MerchantRegisterDTO } from './dto/merchant.dto/merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MerchantLoginDto } from '../auth/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(merchantRegisterDTO:MerchantRegisterDTO) {
    const { username,password,passwordConfirm, phone } = merchantRegisterDTO;

    if (password !== passwordConfirm) {
      throw new ConflictException('两次密码不一致');
    }
    const merchant = await this.merchantRepository.findOne({
      where: [{ username }, { phone }],
    });

    if (merchant) {
      throw new ConflictException('用户名或电话已存在');
    }

    const saltRounds =
      this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 10;

    const hashedPassword = await hash(password, saltRounds);

    const newMerchant = this.merchantRepository.create({
      username,
      password: hashedPassword,
      phone,
    });

    return this.merchantRepository.save(newMerchant);
  }

  validateUser(userId: number) {
    return this.merchantRepository.findOne({ where: { id: userId } });
  }

  async merchantLogin(merchantLoginDto: MerchantLoginDto){
    const merchant = await this.merchantRepository.findOne({
      where: {
        username: merchantLoginDto.username,
      },
    });
    if (!merchant) {
      // throw new MerchantUserNotFoundOrPwdIncorrectException();
      return {}
    }
    // 实际开发中需要使用 bcrypt 这样的库来加密密码
    const passwordValid = await compare(merchantLoginDto.password, merchant.password);

    if (!passwordValid) {
      // throw new MerchantUserNotFoundOrPwdIncorrectException();
      return {}
    }

    // 生成 token
    const payload = {
      // username: merchant.username,
      merchantId: merchant.id,
    };

    console.log(process.env.JWT_EXPIRATION_TIME)
    return {
      accessToken: this.jwtService.sign(payload,{ expiresIn: process.env.JWT_EXPIRATION_TIME || '30d' }),
      merchantInfo:{
        name: merchant.name,
        username: merchant.username,
        phone: merchant.phone,
        email: merchant.email,
      },
    };
  }
}
