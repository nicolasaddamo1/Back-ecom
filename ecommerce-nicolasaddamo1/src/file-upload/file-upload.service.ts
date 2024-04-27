import { Products } from 'src/entities/products.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadRepository } from './file-upload.repository';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>
    ) {}

    async uploadFile(file: Express.Multer.File,productId: string) {
        const product = await this.productsRepository.findOneBy({id: productId})
        if (!product) {
            throw new Error('Product not found');
        }
      const uploadedFile = await this.fileUploadRepository.uploadFile(file)

      await this.productsRepository.update(
         product.id,{
            imgUrl: uploadedFile.secure_url}
      )
      const updatedProduct = await this.productsRepository.findOneBy({id: productId})
      return updatedProduct
    }

}
