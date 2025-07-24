import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OfflineStoreService } from './offline_store.service';
import { CreateOfflineStoreDto } from './dto/create-offlinestore.dto';
import { UpdateOfflineStoreDto } from './dto/update-offlinestore';
import { MerchantAuthGuard } from '../auth/jwt-auth.guard';

@Controller('offline-store')
export class OfflineStoreController {
  constructor(private readonly offlineStoreService: OfflineStoreService) {}


  @Post()
  // @UseGuards(MerchantAuthGuard)
  create(@Body() createStoreDto: CreateOfflineStoreDto) {
    return this.offlineStoreService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.offlineStoreService.findAll();
  }

  @Get('merchant/:merchantId')
  findByMerchantId(@Param('merchantId') merchantId: string) {
    return this.offlineStoreService.findByMerchantId(+merchantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offlineStoreService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateOfflineStoreDto) {
    return this.offlineStoreService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offlineStoreService.remove(+id);
  }

}
