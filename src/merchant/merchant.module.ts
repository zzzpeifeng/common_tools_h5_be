import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { Merchant } from './entities/merchant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 使用 forFeature 方法注册 Merchant 实体
    TypeOrmModule.forFeature([Merchant]),
  ],
  providers: [MerchantService],
  controllers: [MerchantController],
  exports: [MerchantService],
})
export class MerchantModule {}
