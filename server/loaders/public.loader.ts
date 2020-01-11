import * as express from 'express';
import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import * as path from 'path';

export const publicLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const root = path.normalize(__dirname + '/../..');
    const expressApp = settings.getData('express_app');

    expressApp.use(express.static(`${root}/public`));
  }
};
