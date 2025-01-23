import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Joi from 'joi';

import config, { environments } from './config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './common/database/database.module';
import { EmailModule } from './common/email/email.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath:
        environments[process.env.NODE_ENV as keyof typeof environments] ||
        '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        URL_CLIENT: Joi.string().required(),
        SECRET_KEY_JWT: Joi.string().required(),
        SECRET_KEY_JWT_EMAIL: Joi.string().required(),
        EMAIL_RESEND: Joi.string().email().required(),
        KEY_RESEND: Joi.string(),
        ADMIN_USER_EMAIL: Joi.string().email().required(),
        API_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    DatabaseModule,
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
