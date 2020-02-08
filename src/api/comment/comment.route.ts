import { celebrate } from 'celebrate';
import { Router } from 'express';
import CommentController from './comment.controller';

const commentRouter: Router = Router();
const commentController = new CommentController();

commentRouter.post('/', commentController.createComment);

commentRouter.get('/', commentController.getAllComments);

export default commentRouter;
