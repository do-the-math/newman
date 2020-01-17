import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import passport from 'passport';
import passportLocal from 'passport-local';
// import { NextFunction, Request, Response } from 'express';
import { logConsole } from '../utils/log';

const LocalStrategy = passportLocal.Strategy;

export const authenticationLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  const loaderName = 'authenticationLoader';

  return new Promise((resolve, reject) => {
    if (settings) {
      const app = settings.getData('express_app');

      passport.use(
        'local-login',
        new LocalStrategy(
          {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
          },
          (req, email, password, done) => {
            //
          }
        )
      );

      app.use(passport.initialize());
      logConsole(`--- ${loaderName} loaded`);
      resolve();
    }
  });
};
