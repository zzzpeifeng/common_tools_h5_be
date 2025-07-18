import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class MerchantLoginDTO {
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


export class MerchantRegisterDTO {
  @ApiProperty({
    description: '用户名，唯一标识',
    example: 'testuser',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '用户密码',
    example: 'Test@123456',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '确认密码，需与密码一致',
    example: 'Test@123456',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;

  @ApiProperty({
    description: '用户手机号，需符合手机号格式',
    example: '13800138000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('CN') // 验证是否为中国手机号
  phone: string;

  // name
  @ApiProperty({
    description: '用户姓名',
    example: '张三',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // email 可以为空
  @ApiProperty({
    description: '用户邮箱',
    example: 'test@example.com',
    type: String,
  })
  @IsString()
  email: string;
}
