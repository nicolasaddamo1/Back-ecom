import { Products } from "src/entities/products.entity";
import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";


@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    getProducts(page:number, limit:number) {
        return this.productsRepository.getProducts(page, limit);
    }
    updateProduct(id: string, product: Products) {
        return this.productsRepository.updateProduct(id, product)
    }
    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id)
    }
    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }
    addProducts() {
        return this.productsRepository.addProducts()
    }
}