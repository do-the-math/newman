import { Router } from 'express';
import NotificationController from './notifications.controller';

const notificationRouter: Router = Router();
const notificationController = new NotificationController();

notificationRouter.post('/', notificationController.addEvent);

notificationRouter.get('/stream/:id', notificationController.noti);

export default notificationRouter;
