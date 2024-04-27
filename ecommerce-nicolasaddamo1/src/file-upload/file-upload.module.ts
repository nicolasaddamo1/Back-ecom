import { Module } from '@nestjs/common';
import { Products } from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadRepository } from './file-upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
  controllers: [FileUploadController]
})
export class FileUploadModule {}
