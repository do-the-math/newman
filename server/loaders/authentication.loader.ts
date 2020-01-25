import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import passport from 'passport';
import passportLocal from 'passport-local';
import { logConsole } from '../utils/log';

const LocalStrategy = passportLocal.Strategy;

export const authenticationLoader: MicroframeworkLoader = async (
  settings: MicroframeworkSettings | undefined
): Promise<void> => {
  const loaderName = 'authenticationLoader';

  const app = settings.getData('express_app');

  app.use(passport.initialize());
  logConsole(`--- ${loaderName} loaded`);
};
