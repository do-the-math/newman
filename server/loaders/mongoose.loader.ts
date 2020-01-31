import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import mongoose from 'mongoose';
import { logConsole, logError } from '../utils/log';
import config from './../config/config';

export const mongooseLoader: MicroframeworkLoader | any = (
  settings: MicroframeworkSettings
): any => {
  const loaderName = 'mongooseLoader';

  return new Promise(async (resolve, reject) => {
    try {
      mongoose.set('useFindAndModify', false);
      const connection = await mongoose.connect(
        config.MONGO_DB_HOST as string,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: true
        }
      );

      settings.setData('connection', connection);
      settings.onShutdown(() => connection.disconnect());

      logConsole(`--- ${loaderName} loaded`);
      resolve();
    } catch (e) {
      logError(`--- ${loaderName} error`, e);
      reject();
    }
  });
};
