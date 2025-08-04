import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MerchantModule } from '../merchant/merchant.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtMerchantStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    MerchantModule,
    PassportModule,
  ],
  providers: [AuthService,
    // LocalStrategy,
    // JwtStrategy
    JwtMerchantStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}
