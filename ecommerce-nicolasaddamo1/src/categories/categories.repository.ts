import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { Categories } from "../entities/categories.entity";
import * as data from "../data.json";

@Injectable()
export class CategoriesRepository{
    constructor(

        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
        ){
            this.addCategories();
        }
    async getCategories(){
        return await this.categoriesRepository.find();
    }        
    async addCategories(){
        data?.map(async (element)=>{
            await this.categoriesRepository
            .createQueryBuilder()
            .insert()
            .into(Categories)
            .values({
                name: element.category
            })
            .onConflict(`("name") DO NOTHING`)
            .execute()
        });
        return "Categories added"
    }
    
}