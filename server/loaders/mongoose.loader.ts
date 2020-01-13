import { MicroframeworkSettings } from 'microframework';
import { logConsole, logError } from '../utils/log';
import mongoose from 'mongoose';
import config from './../config/config';

export const mongooseLoader = (
  settings: MicroframeworkSettings
): Promise<void> => {
  const loaderName = 'mongooseLoader';

  return new Promise(async (resolve, reject) => {
    try {
      if (settings) {
        mongoose.set('useFindAndModify', false);
        const connection = await mongoose.connect(config.MONGO_DB_HOST, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: true
        });

        settings.setData('connection', connection);
        settings.onShutdown(() => connection.disconnect());

        logConsole(`--- ${loaderName} loaded`);
        resolve();
      }
    } catch (e) {
      logError(`--- ${loaderName} error`, e);
      reject();
    }
  });
};
