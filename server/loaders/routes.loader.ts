import { MicroframeworkSettings } from 'microframework';
import { logConsole, logError } from '../utils/log';
import { Response } from 'express';
import { Request } from '../types/express.extensions';

function apiV1(req: Request, res: Response): void {
  res.send('Sdfs');
}

export const corsLoader = (settings: MicroframeworkSettings): Promise<void> => {
  const loaderName = 'corsLoader';

  return new Promise((resolve, reject) => {
    try {
      const app = settings.getData('express_app');

      // Register routes
      app.use(apiV1);

      logConsole(`--- ${loaderName} loaded`);
      resolve();
    } catch (err) {
      logError(`--- ${loaderName} error`, err);
      reject();
    }
  });
};
