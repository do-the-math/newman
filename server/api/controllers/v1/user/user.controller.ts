import httpStatus from 'http-status';
import UserService from '../../../services/user.service';
import { Request, Response } from './../../../../types/express.extensions';
import { UserDocument } from '../../../data/interfaces/user.interface';
export default class UserController {
  private userService = new UserService();

  public createUser = (request: Request, response: Response): void => {
    const authenticatedUser: UserDocument | undefined = request.user;

    const reqObj: UserDocument = {
      ...request.body,
      isActive: true
    };

    this.userService
      .createUser(authenticatedUser, reqObj)
      .then((r: UserDocument) =>
        response.status(httpStatus.CREATED).send(r)
      )
      .catch((r: UserDocument[]) =>
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json(r)
      );
  };

  public getAllUsers = (request: Request, response: Response): void => {
    const authenticatedUser: UserDocument | undefined = request.user;

    this.userService
      .fetchAllUsers(authenticatedUser)
      .then((r) => {
        response.status(httpStatus.OK).send(r);
      })
      .catch((r) => response.status(httpStatus.NOT_FOUND).send(r));
  };
}
