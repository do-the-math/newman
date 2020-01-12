import { UserDocument } from '../interfaces/user.interface';
import UserModel from '../schemas/user.schema';

class UserRepository {
  public createOne(item: UserDocument): Promise<UserDocument> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('Asdf');
        let _user = new UserModel(item);
        _user = await _user.save();
        const userCreated = _user.toObject();

        resolve(userCreated);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }
}

export = UserRepository;
