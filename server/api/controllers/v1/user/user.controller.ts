import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { IUser } from '../../../data/interfaces/user.interface';
import UserService from '../../../services/user.service';
import Boom from '@hapi/boom';

export default class UserController {
  private userService = new UserService();

  public createUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const authenticatedUser: IUser = request.user as IUser;

    const reqObj: IUser = Object.assign(request.body, {
      isActive: true
    });

    try {
      const user: IUser = await this.userService.createUser(
        authenticatedUser,
        reqObj
      );
      response.status(httpStatus.CREATED).send(user);
    } catch (error) {
      next(error);
    }
  };

  public getAllUsers = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const authenticatedUser: IUser = request.user as IUser;

    try {
      const users: IUser[] = await this.userService.fetchAllUsers(
        authenticatedUser
      );
      if (users && users.length === 0) {
        throw Boom.notFound('No User Found');
      }
      response.status(httpStatus.OK).send(users);
    } catch (error) {
      next(error);
    }
  };
}
