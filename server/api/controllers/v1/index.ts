import { Router } from 'express';
import authRouter from './auth/auth.route';
import notificationRouter from './notifications/notifications.route';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/notifications', notificationRouter);

export default router;
