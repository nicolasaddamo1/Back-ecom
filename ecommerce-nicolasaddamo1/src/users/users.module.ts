import { Users } from "src/entities/users.entity";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { UsersController } from "./users.controller"

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UsersService,UsersRepository]
})
export class UsersModule { }