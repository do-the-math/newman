import { IUser } from '../data/interfaces/user.interface';
import UserRepository = require('../data/repositories/user.repository');

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public createUser = async (
    authentictedUser: IUser,
    reqObj: IUser
  ): Promise<IUser> => {
    const user = await this.userRepository.createOne(reqObj);
    return user;
  };

  public fetchAllUsers = async (
    authenticatedUser: IUser
  ): Promise<IUser[]> => {
    const users: IUser[] = await this.userRepository.fetchAll();

    return users;
  };
}
