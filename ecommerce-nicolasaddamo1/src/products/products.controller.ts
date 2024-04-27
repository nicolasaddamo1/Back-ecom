import { Role } from "src/roles.enum";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ProductsService } from "./products.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Body, Controller,Delete,Get, Param, Put, Query, UseGuards } from "@nestjs/common";

@ApiTags('Products: ')
@Controller('products')

export class ProductsController {
    constructor(private readonly productsService: ProductsService,
    ) {}

    @Get()
    async getProducts(@Query('page') page: number, @Query('limit') limit: number) {

        if(page&&limit){
            return this.productsService.getProducts(page, limit)
        }
        return this.productsService.getProducts(1, 5)
        
    }
    @Get('seeder')
    addProducts() {
        return this.productsService.addProducts()
    }
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id)
    }
    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateProduct(@Query('id') id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product)    
    }
    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id)
    }
}