import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { OfflineStore } from '../../offline_store/entities/offline_store.entity';
import { Point } from './point.entity';
import { PointOperationLog } from './point-operation-log';

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

  @ManyToOne(() => OfflineStore, offlineStore => offlineStore.members)
  offlineStore: OfflineStore; // 关联到门店实体

  // 添加门店关联
  @Column({ name: 'offlineStoreId' })
  offlineStoreId: number; // 添加门店ID关联

  // 一对一关联 point 表
  @OneToOne(() => Point, point => point.member)
  point: Point;

  // 一对多关联 point_operation_log 表
  @OneToMany(() => PointOperationLog, log => log.member)
  pointOperationLogs: PointOperationLog[];
}