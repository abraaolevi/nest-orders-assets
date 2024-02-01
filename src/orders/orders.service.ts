import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/assets/entities/asset.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Asset) private assetRepository: Repository<Asset>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = new Order();
    order.price = createOrderDto.price;

    const asset = await this.assetRepository.findOne({
      where: {
        id: createOrderDto.asset_id,
      },
    });

    order.asset = asset;

    if (!asset) {
      const asset = new Asset();
      asset.id = createOrderDto.asset_id;
      asset.symbol = createOrderDto.asset_id;
      order.asset = asset;
    }

    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }
}
