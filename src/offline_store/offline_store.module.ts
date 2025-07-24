import { Module } from '@nestjs/common';
import { OfflineStoreController } from './offline_store.controller';
import { OfflineStoreService } from './offline_store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfflineStore } from './entities/offline_store.entity';
import { Merchant } from '../merchant/entities/merchant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfflineStore,Merchant]),
  ],
  controllers: [OfflineStoreController],
  providers: [OfflineStoreService]
})
export class OfflineStoreModule {}
