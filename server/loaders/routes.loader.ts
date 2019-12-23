import { MicroframeworkSettings } from 'microframework';
import { logConsole, logError } from '../utils/log';
import apiV1 from './../api/controllers/v1';
import bodyParser from 'body-parser';

export const routesLoader = (
  settings: MicroframeworkSettings,
): Promise<void> => {
  const loaderName = 'corsLoader';

  return new Promise((resolve, reject) => {
    try {
      const app = settings.getData('express_app');

      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      // Register routes
      app.use('/', apiV1);

      logConsole(`--- ${loaderName} loaded`);
      resolve();
    } catch (err) {
      logError(`--- ${loaderName} error`, err);
      reject();
    }
  });
};
