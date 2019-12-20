import cors from 'cors';
import { MicroframeworkSettings } from 'microframework';
import config from '../config/config';
import { logConsole, logError } from '../utils/log';

export const corsLoader = (settings: MicroframeworkSettings): Promise<void> => {
  const loaderName = 'corsLoader';

  return new Promise((resolve, reject) => {
    try {
      const app = settings.getData('express_app');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const whitelist = config.WHITE_LIST_DOMAIN;

      const corsOptions = {
        origin: true,
        maxAge: 3600,
      };
      // app.use();

      logConsole(`--- ${loaderName} loaded`);

      resolve();
    } catch (e) {
      logError(`--- ${loaderName} error`, e);
      reject();
    }
  });
};
