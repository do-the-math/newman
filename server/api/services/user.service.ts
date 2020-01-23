import { User } from '../data/interfaces/user.interface';
import UserRepository = require('../data/repositories/user.repository');

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public createUser = async (
    authentictedUser: User,
    reqObj: User
  ): Promise<User> => {
    const user = await this.userRepository.createOne(reqObj);
    return user;
  };

  public fetchAllUsers = async (
    authenticatedUser: User
  ): Promise<User[]> => {
    const users: User[] = await this.userRepository.fetchAll();

    return users;
  };
}
