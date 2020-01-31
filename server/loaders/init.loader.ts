import bodyParser from 'body-parser';
import compression from 'compression';
import express, {
  Application,
  static as useStatic
} from 'express';
import helmet from 'helmet';
import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import config from '../config/config';
import { logConsole } from '../utils/log';
import * as path from 'path';

export const initLoader: MicroframeworkLoader | any = (
  settings: MicroframeworkSettings
): any => {
  const loaderName = 'initLoader';

  return new Promise((resolve, reject) => {
    const app: Application = express();
    const port: number = parseInt(config.PORT, 10);
    const appName: string = config.APP_NAME;
    const isLocalDev: boolean = config.NODE_ENV === 'local';

    const root = path.normalize(`${__dirname}/../..`);
    app.use(useStatic(`${root}/public`));
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());

    settings.setData('express_app', app);
    settings.setData('port', port);
    settings.setData('appName', appName);
    settings.setData('isLocalDev', isLocalDev);

    logConsole(`--- ${loaderName} loaded`);
    resolve();
  });
};
