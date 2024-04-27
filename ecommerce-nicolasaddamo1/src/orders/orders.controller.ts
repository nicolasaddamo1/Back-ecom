import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Body,Req, Get,Post,ParseUUIDPipe, Param, UseGuards, Request } from '@nestjs/common';

@ApiTags('Orders: ')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto, @Req() req: any){ 
        const usrId= req.user.id
        const {products}=order
        return this.ordersService.addOrder(usrId,products)
    }
    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string){
        return this.ordersService.getOrder(id)
    }
}
