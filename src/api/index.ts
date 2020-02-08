import { Router } from 'express';
import userRouter from './user/users.route';
import authRouter from './auth/auth.route';

const router: Router = Router();

router.use('/users', userRouter);
router.use('/comments', authRouter);

export default router;
