import { IUser } from '../interfaces/user.interface';
import UserModel from '../schemas/user.schema';
import { DocumentQuery } from 'mongoose';

class UserRepository {
  private queryWithOutPassword = { password: 0 };

  public async createOne(item: IUser): Promise<IUser> {
    const user = new UserModel(item);
    const response = await (await user.save()).toObject();

    return response;
  }

  public async fetchAll(): Promise<IUser[]> {
    const response: IUser[] = await UserModel.find(
      {},
      { ...this.queryWithOutPassword }
    ).lean();

    return response;
  }
}

export = UserRepository;
