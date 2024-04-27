import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerMiddleware= new LoggerMiddleware();

  const options = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('The ecommerce API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(loggerMiddleware.use);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
