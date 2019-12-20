import { MicroframeworkSettings } from 'microframework';
import { logConsole, logError } from '../utils/log';
import routesV1 from './../api/controllers/v1';

export const routesLoader = (
  settings: MicroframeworkSettings,
): Promise<void> => {
  const loaderName = 'routesLoader';

  return new Promise((resolve, reject) => {
    try {
      const app = settings.getData('express_app');

      // Register routes
      app.use('/api/v1', routesV1);

      logConsole(`--- ${loaderName} loaded`);
      resolve();
    } catch (err) {
      logError(`--- ${loaderName} error`, err);
      reject();
    }
  });
};
