import { User } from '../interfaces/user.interface';
import UserModel from '../schemas/user.schema';

class UserRepository {
  private queryWithOutPassword = { password: 0 };

  public async createOne(item: User): Promise<User> {
    const user = new UserModel(item);
    const response = await (await user.save()).toObject();

    return response;
  }

  public async fetchAll(): Promise<User[]> {
    const response: User[] = await UserModel.find(
      {},
      { ...this.queryWithOutPassword }
    ).lean();

    return response;
  }
}

export = UserRepository;
