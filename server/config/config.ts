import * as dotenv from 'dotenv';
dotenv.config();

export default {
  // APP
  APP: process.env.APP || 'Newman',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  PORT: process.env.PORT || '3000',
  REQUEST_LIMIT: process.env.REQUEST_LIMIT || '100kb',
  APP_BANNER: process.env.APP_BANNER || true,

  // API VERSIONING
  ROUTE_URL_V1: process.env.ROUTE_URL_V1 || '/api/v1/',

  // CORS
  WHITE_LIST_DOMAIN: [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
  ],

  // LOGGING AND DEBUGGING
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
};
