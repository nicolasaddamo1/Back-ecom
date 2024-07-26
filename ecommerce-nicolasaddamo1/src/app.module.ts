import  typeorm  from './config/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      load:[typeorm]
    }),
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => config.get('typeorm'),
  }),
  AppModule,
  UsersModule,
  CategoriesModule,
  ProductsModule,
  AuthModule,
  OrdersModule,
  FileUploadModule,
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '2h' },
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}