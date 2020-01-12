import { UserDocument } from '../data/interfaces/user.interface';
import UserRepository = require('../data/repositories/user.repository');

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public createUser(authentictedUser, reqObj): Promise<UserDocument> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.createOne(reqObj);
        resolve(user);
      } catch (e) {
        reject(e);
      }
    });
  }
}
