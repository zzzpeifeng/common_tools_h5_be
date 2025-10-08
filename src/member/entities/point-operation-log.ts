// src/point/entities/point-operation-log.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('point_operation_log')
export class PointOperationLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'member_id' })
  memberId: number;

  @Column({ name: 'offline_store_id' })
  offlineStoreId: number;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'int' })
  balance: number;

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
}
