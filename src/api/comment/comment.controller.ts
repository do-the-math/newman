import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { User } from '../../data/interfaces/user.interface';
import UserService from '../../services/user.service';
import Boom from '@hapi/boom';
import { Schema } from 'mongoose';
import CommentModel from '../../data/models/comment.model';

export default class CommentController {
  public createComment = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const authenticatedUser: User = request.user as User;

    const { parentId, userId, message } = request.body;
    try {
      let comment = new CommentModel({
        parentId: parentId,
        userId: userId,
        message: message
      });

      comment = await comment.save();
      response.status(httpStatus.CREATED).send(comment);
    } catch (error) {
      next(error);
    }
  };

  public getAllComments = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const authenticatedUser: User = request.user as User;

    const { commentId, userId } = request.body;

    try {
      let comments: any = await CommentModel.find().lean();
      console.log(comments);
      response.status(httpStatus.OK).send(comments);
    } catch (error) {
      next(error);
    }
  };
}
