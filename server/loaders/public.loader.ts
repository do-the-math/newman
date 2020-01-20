import * as express from 'express';
import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import * as path from 'path';

export const publicLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  const root = path.normalize(__dirname + '/../..');
  const app = settings.getData('express_app');

  app.use(express.static(`${root}/public`));
};
