import bodyParser from 'body-parser';
import compression from 'compression';
import express, { Application } from 'express';
import helmet from 'helmet';
import { MicroframeworkSettings } from 'microframework';
import passport from 'passport';
import config from '../config/config';
import { logConsole, logError } from '../utils/log';

export const initLoader = (
  settings: MicroframeworkSettings
): Promise<void> => {
  const loaderName = 'initLoader';

  return new Promise((resolve, reject) => {
    try {
      const app: Application = express();
      const port: number = parseInt(config.PORT, 10);
      const appName: string = config.APP_NAME;
      const isLocal: boolean = config.NODE_ENV === 'local';
      const isDev: boolean = config.NODE_ENV === 'development';

      app.use(compression());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(passport.initialize());
      app.use(helmet());

      settings.setData('express_app', app);
      settings.setData('port', port);
      settings.setData('appName', appName);
      settings.setData('isLocal', isLocal);
      settings.setData('isDev', isDev);

      logConsole(`--- ${loaderName} loaded`);

      resolve();
    } catch (error) {
      logError(`--- initLoader loaded error`, error);
      reject();
    }
  });
};
