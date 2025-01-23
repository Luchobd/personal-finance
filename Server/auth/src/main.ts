import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { PORT } from './process-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');

  app.use(morgan('dev'));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // * Configure documentation with Swagger.
  const config = new DocumentBuilder()
    .setTitle('Personal Finances RESTFUL API Documentation')
    .setDescription('Personal Finances endpoints')
    .setVersion('0.0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(PORT ?? 3001);
  logger.log(`App running on port ${PORT}`);
}
bootstrap();
