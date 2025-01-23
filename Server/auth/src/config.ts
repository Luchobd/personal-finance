import { registerAs } from '@nestjs/config';
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  KEY_RESEND,
  EMAIL_RESEND,
  API_KEY,
  SECRET_KEY_JWT,
  SECRET_KEY_JWT_EMAIL,
} from './process-env';

export default registerAs('config', () => {
  return {
    postgres: {
      host: DB_HOST,
      port: +DB_PORT!,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    resend: {
      key: KEY_RESEND,
      email: EMAIL_RESEND,
    },
    apiKey: API_KEY,
    jwtSecret: SECRET_KEY_JWT,
    jwtSecretEmail: SECRET_KEY_JWT_EMAIL,
  };
});

export const environments = {
  dev: '.env',
  stag: '.stag.env',
  prod: '.prod.env',
};
