import { UserDocument } from '../interfaces/user.interface';
import UserModel from '../schemas/user.schema';

class UserRepository {
  public createOne(item: UserDocument): Promise<UserDocument> {
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

  public fetchAllUsers(): Promise<UserDocument[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const _users: UserDocument[] = await UserModel.find({});

        resolve(_users);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export = UserRepository;
