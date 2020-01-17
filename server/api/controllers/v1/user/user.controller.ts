import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { IUser } from '../../../data/interfaces/user.interface';
import UserService from '../../../services/user.service';

export default class UserController {
  private userService = new UserService();

  public createUser = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const authenticatedUser: IUser = request.user as IUser;

    const reqObj: IUser = Object.assign(request.body, {
      isActive: true
    });

    this.userService
      .createUser(authenticatedUser, reqObj)
      .then((data: IUser) =>
        response.status(httpStatus.CREATED).send(data)
      )
      .catch((error) => next(error));
  };

  public getAllUsers = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const authenticatedUser: IUser = request.user as IUser;

    this.userService
      .fetchAllUsers(authenticatedUser)
      .then((data: IUser[]) => {
        response.status(httpStatus.OK).send(data);
      })
      .catch((error) => next(error));
  };
}
