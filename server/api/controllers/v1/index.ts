import { Router } from 'express';
import { AuthController } from './auth/auth.controller';
import { NotificationController } from './notifications/notifications.controller';

const v1Router: Router = Router();

const v1Controllers = [
  AuthController,
  NotificationController,
  // UserController
];

export { v1Controllers, v1Router };
