import { PartialType } from '@nestjs/mapped-types';
import { CreateOfflineStoreDto } from './create-offlinestore.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOfflineStoreDto extends PartialType(CreateOfflineStoreDto) {
  @ApiPropertyOptional({
    description: '门店名称，默认值为 offlineStore',
    example: '线下门店1',
    default: 'offlineStore',
  })
  name?: string;

  @ApiPropertyOptional({
    description: '门店地址',
    example: '北京市朝阳区 XX 街 XX 号',
  })
  address?: string;

  @ApiPropertyOptional({
    description: '门店电话',
    example: '13800138000',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: '门店状态，默认激活',
    example: true,
    default: true,
  })
  isActive?: boolean;
}