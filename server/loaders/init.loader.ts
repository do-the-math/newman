import { MicroframeworkSettings } from 'microframework';
import config from '../config/config';
import { logConsole, logError } from '../utils/log';
import express, { Application } from 'express';

export const initLoader = (settings: MicroframeworkSettings): Promise<void> => {
  const loaderName = 'initLoader';

  return new Promise((resolve, reject) => {
    try {
      const app: Application = express();
      const port: number = parseInt(config.PORT, 10);

      settings.setData('express_app', app);
      settings.setData('port', port);

      logConsole(`--- ${loaderName} loaded`);

      resolve();
    } catch (err) {
      logError(`--- initLoader loaded error`, err);
      reject();
    }
  });
};
