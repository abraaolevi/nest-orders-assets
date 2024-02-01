import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from 'src/assets/entities/asset.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
