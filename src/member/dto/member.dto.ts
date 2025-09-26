import {
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MemberRegisterDTO {

  @ApiProperty({
    description: '会员名',
    example: '会员名01',
  })
  @IsString()
  @Length(4, 20)
  username: string;


  @ApiProperty({
    description: 'pin码',
    example: '1234',
  })
  @IsString()
  @Length(6, 20)
  password: string;


  @ApiProperty({
    description: 'pin码确认',
    example: '1234',
  })
  @IsString()
  passwordConfirm: string;

  @ApiProperty({
    description: '电话',
    example: '13011112222',
  })
  @IsPhoneNumber('CN')
  phone: string;

  @IsOptional()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email?: string;

  @ApiProperty({
    description: '门店ID',
    example: 1,
  })
  @IsInt()
  offlineStoreId: number; // 添加门店ID关联
}

export class GetMembersDto {

  @ApiProperty({
    description: '门店ID',
    example: 1,
  })
  @IsInt()
  offlineStoreId: number;

  @ApiProperty({
    description: '页数',
    example: 1,
  })
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: '每页数量',
    example: 10,
  })
  @IsOptional()
  limit?: number = 10;
}

// 添加删除DTO
export class DeleteMemberDto {

  @ApiProperty({
    description: '会员ID',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: '门店ID',
    example: 1,
  })
  @IsInt()
  offlineStoreId: number;
}
