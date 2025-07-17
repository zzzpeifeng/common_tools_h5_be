import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: '默认名称' })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  isActive: boolean;

  // 可选：用于 JWT 记录登录状态
  @Column({ nullable: true })
  lastLogin?: Date;

  // 记录创建时间
  @CreateDateColumn()
  createdAt: Date;

  // 记录更新时间
  @UpdateDateColumn()
  updatedAt: Date;
}
