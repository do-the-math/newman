import { IUser } from '../data/interfaces/user.interface';
import UserRepository = require('../data/repositories/user.repository');
import Boom = require('@hapi/boom');

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public createUser = (
    authentictedUser: IUser,
    reqObj: IUser
  ): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.createOne(reqObj);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };

  public fetchAllUsers = async (
    authenticatedUser: IUser
  ): Promise<IUser[]> => {
    const users: IUser[] = await this.userRepository.fetchAllUsers();
    if (users && users.length === 0) {
      throw Boom.notFound('No User Found');
    }
    return users;
  };
}
