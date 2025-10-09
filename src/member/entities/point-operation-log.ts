// src/point/entities/point-operation-log.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Point } from './point.entity';
import { Member } from './member.entity';

@Entity('point_operation_log')
export class PointOperationLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'offline_store_id' })
  offlineStoreId: number;

  @Column({ type: 'int' })
  pointsChange: number; // 积分变化

  @Column({ type: 'int' })
  balance: number;  // 积分余额

  @Column({ name: 'operation_type', length: 50 })
  operationType: string;

  @Column({ name: 'related_id', nullable: true })
  relatedId: number;

  @Column({ name: 'merchantId', type: 'int'})
  merchantId: number;

  @Column({ type: 'text', nullable: true })
  remark: string;

  @CreateDateColumn({ name: 'option_time_at' })
  optionTimeAt: Date;

  // 多对一关联member表
  @ManyToOne(() => Member, member => member.pointOperationLogs)
  @JoinColumn({ name: 'memberId' })
  member: Member;

}
