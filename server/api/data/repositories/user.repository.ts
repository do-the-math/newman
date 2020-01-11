import {
  default as User,
  default as UserSchema
} from '../schemas/user.schema';
import { IUser, IUserModel } from '../interfaces/user.interface';
import { RepositoryBase } from './base/base.repository';

class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }

  public createUser(userObj: IUser): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = new User(userObj);

        let userCreated = await user.save();

        userCreated = userCreated.toObject();
        delete userCreated.password;

        resolve(userCreated);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export = UserRepository;
