import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import mongoose from 'mongoose';
import { logConsole, logError } from '../utils/log';
import config from './../config/config';

export const mongooseLoader: MicroframeworkLoader = async (
  settings: MicroframeworkSettings | undefined
): Promise<void> => {
  const loaderName = 'mongooseLoader';

  try {
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
  } catch (e) {
    logError(`--- ${loaderName} error`, e);
  }
};
