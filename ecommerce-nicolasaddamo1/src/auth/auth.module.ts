import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { UsersRepository } from "src/users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { CategoriesRepository } from "src/categories/categories.repository";
import { ProductsRepository } from "src/products/products.repository";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
@Module({
    imports:[TypeOrmModule.forFeature([Users]), TypeOrmModule.forFeature([Categories]), TypeOrmModule.forFeature([Products])],
    controllers:[AuthController],
    providers:[AuthService, AuthRepository, UsersRepository, CategoriesRepository, ProductsRepository],
})
export class AuthModule {}