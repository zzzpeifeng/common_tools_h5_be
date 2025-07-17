import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { MerchantRegisterDTO } from './dto/merchant.dto/merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
    private configService: ConfigService,
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
}
