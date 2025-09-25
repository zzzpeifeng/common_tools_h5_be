import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsOptional, IsPhoneNumber, IsString, Length, Matches } from 'class-validator';

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // 添加门店关联
  @IsInt()
  offlineStoreId: number;
}


export class MemberRegisterDTO {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  passwordConfirm: string;

  @IsPhoneNumber('CN')
  phone: string;

  @IsOptional()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email?: string;

  @IsInt()
  offlineStoreId: number; // 添加门店ID关联
}


export class GetMembersDto {
  @IsInt()
  offlineStoreId: number;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}

// 添加删除DTO
export class DeleteMemberDto {
  @IsInt()
  id: number;

  @IsInt()
  offlineStoreId: number;
}