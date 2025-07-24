import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MerchantAuthGuard extends AuthGuard('merchant') {
  constructor() {
    super();
  }
}