
```js
import typeorm from './config/typeorm'; // Importa la configuración de TypeORM desde el archivo typeorm.ts

import { Module } from '@nestjs/common'; // Importa el decorador Module de Nest.js
import { JwtModule } from '@nestjs/jwt'; // Importa el módulo JwtModule de Nest.js
import { AuthModule } from './auth/auth.module'; // Importa el módulo AuthModule desde el archivo auth.module.ts
import { UsersModule } from './users/users.module'; // Importa el módulo UsersModule desde el archivo users.module.ts
import { OrdersModule } from './orders/orders.module'; // Importa el módulo OrdersModule desde el archivo orders.module.ts
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo TypeOrmModule de Nest.js
import { ProductsModule } from './products/products.module'; // Importa el módulo ProductsModule desde el archivo products.module.ts
import { CategoriesModule } from './categories/categories.module'; // Importa el módulo CategoriesModule desde el archivo categories.module.ts
import { FileUploadModule } from './file-upload/file-upload.module'; // Importa el módulo FileUploadModule desde el archivo file-upload.module.ts
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa los módulos ConfigModule y ConfigService de Nest.js

@Module({ // Define el módulo AppModule utilizando el decorador Module de Nest.js
  imports: [ // Define los módulos importados por AppModule
    ConfigModule.forRoot({ // Configura el módulo ConfigModule como global y carga la configuración definida en el archivo typeorm.ts
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({ // Configura el módulo TypeOrmModule para que se inicialice de forma asíncrona utilizando ConfigService
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'), // Utiliza una función de fábrica para obtener la configuración de TypeORM
    }),
    UsersModule, // Importa el módulo UsersModule
    ProductsModule, // Importa el módulo ProductsModule
    AuthModule, // Importa el módulo AuthModule
    CategoriesModule, // Importa el módulo CategoriesModule
    OrdersModule, // Importa el módulo OrdersModule
    FileUploadModule, // Importa el módulo FileUploadModule
    JwtModule.register({ // Registra el módulo JwtModule y configura las opciones de firma del token JWT
      global: true, // Indica que el módulo JwtModule es global
      secret: process.env.JWT_SECRET, // Utiliza la variable de entorno JWT_SECRET como secreto para firmar el token JWT
      signOptions: { expiresIn: '2h' }, // Establece la duración de validez del token JWT en 2 horas
    }),
  ],
  controllers: [], // Define los controladores asociados al módulo AppModule (en este caso, no hay controladores definidos)
  providers: [], // Define los proveedores (servicios) asociados al módulo AppModule (en este caso, no hay proveedores definidos)
})
export class AppModule {} // Define la clase AppModule que representa el módulo principal de la aplicación
```