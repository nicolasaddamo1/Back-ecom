import { Module } from '@nestjs/common';
import { Products } from 'src/entities/products.entity';
import { Categories } from 'src/entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Products, Categories]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, CategoriesRepository],
    exports: [ProductsService]
})
export class ProductsModule { }