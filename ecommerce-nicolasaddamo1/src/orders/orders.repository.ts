import {Users} from 'src/entities/users.entity';
import {Orders} from 'src/entities/orders.entity';
import {Products} from 'src/entities/products.entity';
import {Repository} from 'typeorm';
import {OrderDetails} from '../entities/orderdetails.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class OrdersRepository {
    
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
        
    ){}
    async addOrder(userId: any, products: any) {
        let total = 0;
        const user = await this.usersRepository.findOneBy({id: userId});
        if (!user) {
            return "User not found";
        }
        const order = new Orders();
        order.date = new Date();
        order.user = user
        
        const newOrder = await this.ordersRepository.save(order);
        
        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({id: element.id});
                if (!product) {
                    throw new NotFoundException('Product not found');
                }
                total += Number (product.price);
                
                await this.productsRepository.update(
                    {id: product.id},
                    {stock: product.stock - 1}
                    );
                    console.log(product.price)
                    console.log()
                    return product
                })
                )
                const orderDetail = new OrderDetails();
                orderDetail.price = Number(Number(total).toFixed(2));
                orderDetail.products = productsArray;
                orderDetail.order = newOrder;

                await this.orderDetailsRepository.save(orderDetail);
                return await this.ordersRepository.find({
                    where: {id: newOrder.id},
                    relations: {
                        orderDetails: true
                    }
                })

            }
            async getOrder(id: string): Promise<Orders | string> {
                const order = await this.ordersRepository.findOne({where: {id}, relations: ['orderDetails']});
            
                if (!order) {
                  throw new NotFoundException('Order not found');
                }
            
                return order;
              }
}