import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  // 可选：用于 JWT 记录登录状态
  @Column({ nullable: true })
  lastLogin?: Date;
}
