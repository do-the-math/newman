import { Router } from 'express';
import { UserController } from './user/user.controller';

const v1Router: Router = Router();

const v1Controllers = [UserController];

export { v1Controllers, v1Router };
