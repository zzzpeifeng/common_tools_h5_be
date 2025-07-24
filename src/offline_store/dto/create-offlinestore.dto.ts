import { IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfflineStoreDto {
  @ApiProperty({
    description: '门店名称，默认值为 offlineStore',
    example: '线下门店1',
    default: 'offlineStore',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '门店地址',
    example: '北京市朝阳区 XX 街 XX 号',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: '门店电话',
    example: '13800138000',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: '门店状态，默认激活',
    example: true,
    default: true,
  })
  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    description: '关联的商家 ID 数组',
    example: [1,],
  })
  merchantIds: number[];
}