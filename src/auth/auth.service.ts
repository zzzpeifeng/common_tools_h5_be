import { Injectable } from '@nestjs/common';
import { MerchantLoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MerchantService } from '../merchant/merchant.service';

@Injectable()
export class AuthService {
  constructor(
    private merchantService: MerchantService,
    // private jwtService: JwtService,
    // private configService: ConfigService,
  ) {}

  validateUser(userId: number) {
    return this.merchantService.validateUser(userId);
  }
  async merchantLogin(merchantLoginDto: MerchantLoginDto) {
    return await this.merchantService.merchantLogin(merchantLoginDto);
  }
}
