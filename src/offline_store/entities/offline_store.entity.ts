import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Merchant } from '../../merchant/entities/merchant.entity';

@Entity()
export class OfflineStore {
  @PrimaryGeneratedColumn()
  id: number; // 门店 id

  @Column({ default: 'offlineStore', unique: true })
  name: string; // 门店名称，默认值为 offlineStore

  @Column()
  address: string; // 门店地址


  @Column({ unique: true })
  phone: string; // 门店电话  唯一字段

  @Column({ default: true })
  isActive: boolean; // 门店状态，默认激活

  @Column({ nullable: false })
  icon: string;

  @ManyToMany(() => Merchant, merchant => merchant.offlineStores)
  @JoinTable()
  merchants: Merchant[]; // 关联的商家用户
}