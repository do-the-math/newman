import { IUser } from '../interfaces/user.interface';
import UserModel from '../schemas/user.schema';
import { DocumentQuery } from 'mongoose';

class UserRepository {
  public createOne(item: IUser): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        let _user = new UserModel(item);
        _user = await _user.save();
        const userCreated = _user.toObject();

        resolve(userCreated);
      } catch (e) {
        reject(e);
      }
    });
  }

  public fetchAllUsers(): Promise<IUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        throw new Error('my name is aman');

        const _users: IUser[] = await UserModel.find(
          {},
          { password: 0 }
        ).lean();

        resolve(_users);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export = UserRepository;
