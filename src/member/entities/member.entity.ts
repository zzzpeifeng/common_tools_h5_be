import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OfflineStore } from '../../offline_store/entities/offline_store.entity';

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


}