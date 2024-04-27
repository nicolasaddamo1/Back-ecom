import { Users } from '../entities/users.entity';
import { Orders } from '../entities/orders.entity';
import { Module } from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { OrderDetails } from '../entities/orderdetails.entity'
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users, Products, OrderDetails])],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
