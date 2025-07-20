import { IsNotEmpty, IsString } from 'class-validator';

export class MerchantLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}