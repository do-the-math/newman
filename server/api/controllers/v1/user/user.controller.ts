import httpStatus from 'http-status';
import UserService from '../../../services/user.service';
import {
  Request,
  Response,
  NextFunction
} from './../../../../types/express.extensions';
import { UserDocument } from '../../../data/interfaces/user.interface';
export default class UserController {
  private userService = new UserService();

  public createUser = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const authenticatedUser: UserDocument = request.user;

    const reqObj: UserDocument = Object.assign(request.body, {
      isActive: true
    });

    this.userService
      .createUser(authenticatedUser, reqObj)
      .then((r: UserDocument) =>
        response.status(httpStatus.CREATED).send(r)
      )
      .catch((error) => next(error));
  };

  public getAllUsers = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const authenticatedUser: UserDocument = request.user;

    this.userService
      .fetchAllUsers(authenticatedUser)
      .then((r) => {
        response.status(httpStatus.OK).send(r);
      })
      .catch((error) => next(error));
  };
}
