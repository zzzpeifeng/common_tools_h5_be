import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfflineStore } from './entities/offline_store.entity';
import { Repository } from 'typeorm';
import { UpdateOfflineStoreDto } from './dto/update-offlinestore';
import { CreateOfflineStoreDto } from './dto/create-offlinestore.dto';
import { Merchant } from '../merchant/entities/merchant.entity';

@Injectable()
export class OfflineStoreService {

  constructor(
    @InjectRepository(OfflineStore)
    private readonly offlineStoreRepository: Repository<OfflineStore>,
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
    ) {}



  async create(createOfflineStoreDto: CreateOfflineStoreDto) {

    // 从传入的 CreateStoreDto 对象中解构出 merchantIds 数组，
    // 同时将其余属性存储在 storeData 对象里
    const { merchantIds, name, phone, ...storeData } = createOfflineStoreDto;


    // 校验 name 是否重复
    const existingStoreByName = await this.offlineStoreRepository.findOne({ where: { name } });
    if (existingStoreByName) {
      throw new ConflictException('该门店名称已存在，请使用其他名称');
    }

    // 校验 phone 是否重复
    const existingStoreByPhone = await this.offlineStoreRepository.findOne({ where: { phone } });
    if (existingStoreByPhone) {
      throw new ConflictException('该门店电话已被使用，请使用其他电话');
    }


    // 使用 Promise.all 并发执行多个异步操作，等待所有操作完成
    const merchants = await Promise.all(
      // 对 merchantIds 数组中的每个元素执行异步操作
      merchantIds.map(async (id) => {
        const merchant = await this.merchantRepository.findOne({ where: { id } });
        if (!merchant) {
          throw new NotFoundException(`商家 ID ${id} 不存在`);
        }
        return merchant;
      }),
    );
    const offlineStore = this.offlineStoreRepository.create(createOfflineStoreDto);
    offlineStore.merchants = merchants;
    return this.offlineStoreRepository.save(offlineStore);
  }

  async findAll() {
    return this.offlineStoreRepository.find({ relations: ['merchants'] }); // 关联查询商户信息
  }


  async findByMerchantId(merchantId: number) {
    return this.offlineStoreRepository.find({
      where: { merchants: { id: merchantId } },
      relations: ['merchants'],
    });
  }

  async findOne(id: number) {
    return this.offlineStoreRepository.findOne({ where: { id }, relations: ['merchants'] });
  }

  async update(id: number, updateStoreDto: UpdateOfflineStoreDto) {
    await this.offlineStoreRepository.update(id, updateStoreDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.offlineStoreRepository.delete(id);
  }




}
