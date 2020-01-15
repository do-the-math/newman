import bodyParser from 'body-parser';
import { Application } from 'express';
import { MicroframeworkSettings } from 'microframework/MicroframeworkSettings';
import { ErrorWithStatus } from '../types/node.extensions';
import { logBanner, logConsole, logError } from '../utils/log';
import v1Router from '../api/controllers/v1';
import { boomify, isBoom } from '@hapi/boom';

export const serverLoader = (
  settings: MicroframeworkSettings
): Promise<void | string> => {
  const loaderName = 'sererLoader';

  return new Promise((resolve, reject) => {
    try {
      const appName: string = settings.getData('appName');
      const app: Application = settings.getData('express_app');
      const port: number = settings.getData('port');

      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      /* Register Routes */
      app.use('/api/v1', v1Router);

      app.use((err, req, res, next) => {
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
          .json({ ...boomed.output.payload, ...boomed.data });
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
