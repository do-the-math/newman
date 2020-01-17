import { IUser } from '../data/interfaces/user.interface';
import UserRepository = require('../data/repositories/user.repository');

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

  public fetchAllUsers = (authenticatedUser: IUser): Promise<IUser[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const users: IUser[] = await this.userRepository.fetchAllUsers();
        if (users == null || users.length === 0) {
          return reject({
            err: `Please try again later with authorized user`
          });
        }
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  };
}
