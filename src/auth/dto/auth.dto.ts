import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MerchantLoginDto {
  @ApiProperty({
    description: '用户名',
    example: 'testuser',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '用户密码',
    example: 'Test@123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}