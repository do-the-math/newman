import { MicroframeworkSettings } from 'microframework';
import { exampleSSE } from '../api/events/example/countdown';
import { logConsole, logError } from '../utils/log';
import apiV1 from './../api/controllers/v1';

export const routesLoader = (
  settings: MicroframeworkSettings,
): Promise<void> => {
  const loaderName = 'corsLoader';

  return new Promise((resolve, reject) => {
    try {
      const app = settings.getData('express_app');

      // Register routes
      app.use('/api/v1', apiV1);

      // Register events
      app.get('/countdown', exampleSSE);

      logConsole(`--- ${loaderName} loaded`);
      resolve();
    } catch (err) {
      logError(`--- ${loaderName} error`, err);
      reject();
    }
  });
};
