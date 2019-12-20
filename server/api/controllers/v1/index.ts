import { Router } from 'express';
import authRouter from './auth/auth.route';

const router: Router = Router();

router.use('/auth', authRouter);

export default router;
