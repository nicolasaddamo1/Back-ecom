import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}
    addOrder(userId: any, products: any) {
        return this.ordersRepository.addOrder(userId, products)
    }
    getOrder(id: string) {
        return this.ordersRepository.getOrder(id)
    }
}
