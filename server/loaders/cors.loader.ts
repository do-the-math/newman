import cors from 'cors';
import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import config from '../config/config';
import { logConsole, logError } from '../utils/log';

export const corsLoader: MicroframeworkLoader = async (
  settings: MicroframeworkSettings | undefined
): Promise<void> => {
  const loaderName = 'corsLoader';

  try {
    const app = settings.getData('express_app');

    const whitelist = config.WHITE_LIST_URL;

    const corsOptions = {
      origin: (origin, callback) => {
        callback(null, true);
      },
      maxAge: 3600
    };
    app.use(cors(corsOptions));

    logConsole(`--- ${loaderName} loaded`);
  } catch (e) {
    logError(`--- ${loaderName} error`, e);
  }
};
