import * as dotenv from 'dotenv';
dotenv.config();

export default {
  // APP
  APP_NAME: process.env.APP || 'Newman',
  PORT: process.env.PORT || '3000',
  APP_URL: process.env.APP_URL || `http://localhost:${process.env.PORT}`,
  REQUEST_LIMIT: process.env.REQUEST_LIMIT || '100kb',
  APP_BANNER: process.env.APP_BANNER || false,

  // API VERSIONING
  ROUTE_URL_V1: process.env.ROUTE_URL_V1 || '/api/v1/',

  // SWAGGER
  SWAGGER_ENABLED: process.env.SWAGGER_ENABLED || false,
  SWAGGER_SPEC: process.env.SWAGGER_SPEC || '/spec.json',
  SWAGGER_ROUTE: process.env.SWAGGER_ROUTE || '/docs',
  SWAGGER_USERNAME: process.env.SWAGGER_USERNAME || 'admin',
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD || 'admin',

  // LOGGING AND DEBUGGING
  NODE_ENV: process.env.NODE_ENV || 'local',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  // MONGO DATABASES
  MONGO_DB_DIALECT: process.env.DB_DIALECT || 'mongodb+srv',
  MONGO_DB_HOST: process.env.DB_HOST,
  MONGO_DB_PORT: process.env.DB_PORT || '27017',
  MONGO_DB_NAME: process.env.DB_NAME || 'elevate-iq-dev',
  MONGO_DB_USER: process.env.DB_USER || 'elevate-iq-app',
  MONGO_DB_PASSWORD: process.env.DB_PASSWORD || 'JUysC66dNI3OiLPT'
};
