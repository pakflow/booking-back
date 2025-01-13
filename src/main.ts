import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Включение трансформации для DTO
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000', // Разрешённый источник
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Разрешённые HTTP-методы
    credentials: true, // Если вы используете cookies или заголовки Authorization
  });

  app.setGlobalPrefix('api/v1'); // Здесь "v1" — версия API

  await app.listen(process.env.PORT ?? 5471);
}
bootstrap();
