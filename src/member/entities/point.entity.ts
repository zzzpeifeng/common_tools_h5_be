// 示例：point.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { PointOperationLog } from './point-operation-log';

@Entity('point')
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'offline_store_id' })
  offlineStoreId: number;

  @Column({ type: 'int', default: 0 })
  points: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // 反向一对一关联 member 表
  @OneToOne(() => Member, member => member.point)
  @JoinColumn({ name: 'memberId' }) // 明确指定外键列
  member: Member;


  // 可以添加与 Member 和 OfflineStore 的关联关系
}
