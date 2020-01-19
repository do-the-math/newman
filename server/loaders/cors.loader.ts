import cors from 'cors';
import { MicroframeworkSettings } from 'microframework';
import { logConsole, logError } from '../utils/log';
import config from '../config/config';

export const corsLoader = (
  settings: MicroframeworkSettings
): Promise<void> => {
  const loaderName = 'corsLoader';

  return new Promise((resolve, reject) => {
    try {
      const app = settings.getData('express_app');

      // const whitelist = config.WHITE_LIST_URL;

      const corsOptions = {
        origin: (origin, callback) => {
          callback(null, true);
        },
        maxAge: 3600
      };
      app.use(cors(corsOptions));

      logConsole(`--- ${loaderName} loaded`);

      resolve();
    } catch (e) {
      logError(`--- ${loaderName} error`, e);
      reject();
    }
  });
};
