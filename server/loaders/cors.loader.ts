import cors, { CorsOptions } from 'cors';
import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import config from '../config/config';
import { logConsole, logError } from '../utils/log';

export const corsLoader: MicroframeworkLoader | any = (
  settings: MicroframeworkSettings
): any => {
  const loaderName = 'corsLoader';

  return new Promise((resolve, reject) => {
    const app = settings.getData('express_app');

    const whitelist = config.WHITE_LIST_URL;

    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        callback(null, true);
      },
      maxAge: 3600
    };
    app.use(cors(corsOptions));

    logConsole(`--- ${loaderName} loaded`);
    resolve();
  });
};
