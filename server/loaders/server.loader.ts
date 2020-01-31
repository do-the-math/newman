import { boomify, isBoom } from '@hapi/boom';
import { errors } from 'celebrate';
import {
  Application,
  NextFunction,
  Response,
  Request
} from 'express';
import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import v1Router from '../api/controllers/v1';
import {
  logBanner,
  logConsole,
  logError
} from '../utils/log';
import util from 'util';

export const serverLoader: MicroframeworkLoader | any = (
  settings: MicroframeworkSettings
): any => {
  const loaderName = 'serverLoader';

  return new Promise(async (resolve, reject) => {
    const appName: string = settings.getData('appName');
    const app: Application = settings.getData(
      'express_app'
    );
    const port: number = settings.getData('port');

    /* Register Routes */
    app.use('/api/v1', v1Router);

    /* Error Middleware after routes */
    app.use(errors());
    app.use(
      (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
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
          .json(
            Object.assign(
              boomed.output.payload,
              boomed.data
            )
          );
      }
    );

    app.listen(port, (error) => {
      if (error) {
        logError(`--- ${loaderName} error`, error);
        reject();
      }
      resolve();
    });
  });
};
