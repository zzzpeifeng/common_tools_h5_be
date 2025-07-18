import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MerchantModule } from '../merchant/merchant.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { LocalStrategy } from './local.strategy';
// import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // MerchantModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET, // 替换为实际的密钥
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService,
    // LocalStrategy,
    // JwtStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}
