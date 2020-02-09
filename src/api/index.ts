import { Router } from 'express';
import userRouter from './user/users.route';
import commentRouter from './comment/comment.route';

const router: Router = Router();

router.use('/users', userRouter);
router.use('/comments', commentRouter);

export default router;
