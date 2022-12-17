import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/public', express.static(join(__dirname, '..', 'uploadedImages')));
  await app.listen(3000);
}
bootstrap();
