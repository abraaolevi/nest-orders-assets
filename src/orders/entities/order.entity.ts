import { Asset } from 'src/assets/entities/asset.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderStatus {
  OPEN = 'open',
  PENDING = 'pending',
  CLOSED = 'closed',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Asset, { cascade: ['insert'], eager: true })
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;

  @Column()
  asset_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  status: OrderStatus = OrderStatus.OPEN;

  @CreateDateColumn()
  created_at: Date;
}
