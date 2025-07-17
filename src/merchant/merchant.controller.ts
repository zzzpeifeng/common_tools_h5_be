import { Body, Controller, Get, Post } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantRegisterDTO } from './dto/merchant.dto/merchant.dto';

@Controller('merchant')
export class MerchantController {
  constructor(private merchantService: MerchantService) {}
  // @Get()
  // async getMerchant() {
  //   return this.merchantService.getMerchant();
  // }

  @Post("register")
  async register(@Body() merchantRegisterDTO: MerchantRegisterDTO) {
    return this.merchantService.register(merchantRegisterDTO);
  }
}
