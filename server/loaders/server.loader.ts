import { boomify, isBoom } from '@hapi/boom';
import { errors } from 'celebrate';
import { Application } from 'express';
import { MicroframeworkSettings } from 'microframework/MicroframeworkSettings';
import v1Router from '../api/controllers/v1';
import { ErrorWithStatus } from '../types/node';
import { logBanner, logConsole, logError } from '../utils/log';

export const serverLoader = (
  settings: MicroframeworkSettings
): Promise<void | string> => {
  const loaderName = 'serverLoader';

  return new Promise((resolve, reject) => {
    try {
      const appName: string = settings.getData('appName');
      const app: Application = settings.getData('express_app');
      const port: number = settings.getData('port');

      /* Register Routes */
      app.use('/api/v1', v1Router);

      /* Error Middleware after routes */
      app.use(errors());
      app.use((err: any, req, res, next) => {
        let boomed = null;
        if (!isBoom(err)) {
          const errorResponse = {
            statusCode: err.status || 500,
            message: err.message
          };

          boomed = boomify(err, errorResponse);
        } else {
          boomed = err;
        }

        return res
          .status(boomed.output.statusCode)
          .json(Object.assign(boomed.output.payload, boomed.data));
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
