import { IUser } from '../interfaces/user.interface';
import UserModel from '../schemas/user.schema';
import { DocumentQuery } from 'mongoose';

class UserRepository {
  public async createOne(item: IUser): Promise<IUser> {
    let _user = new UserModel(item);
    _user = await _user.save();
    const userCreated = _user.toObject();

    return userCreated;
  }

  public async fetchAllUsers(): Promise<IUser[]> {
    const _users: IUser[] = await UserModel.find(
      {},
      { password: 0 }
    ).lean();

    return _users;
  }
}

export = UserRepository;
