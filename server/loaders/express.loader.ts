import bodyParser from 'body-parser';
import { Application } from 'express';
import { MicroframeworkSettings } from 'microframework/MicroframeworkSettings';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { ErrorWithStatus } from '../types/node.extensions';
import { logBanner, logConsole, logError } from '../utils/log';
import { v1Controllers, v1Router } from './../api/controllers/v1';

export const expressLoader = (
  settings: MicroframeworkSettings,
): Promise<void> => {
  const loaderName = 'expressLoader';

  return new Promise((resolve, reject) => {
    try {
      const appName: string = settings.getData('appName');
      const app: Application = settings.getData('express_app');
      const port: number = settings.getData('port');

      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      /* Register Routes */
      app.use('/', v1Router);

      /* Register controller */
      useExpressServer(app, {
        routePrefix: '/api',
        controllers: [...v1Controllers],
      });

      /* Start listenting */
      app
        .listen(port, () => {
          logConsole(`--- ${loaderName} loaded`);
          logBanner(`${appName} started listening on port:${port}`);

          resolve();
        })
        .on('error', function(err: ErrorWithStatus) {
          if (err.code === 'EADDRINUSE') {
            logError(`----- Port ${port} is busy`, err);
          }
          reject();
        });
    } catch (err) {
      logError(`--- ${loaderName} error`, err);
      reject();
    }
  });
};
