import passport from 'passport';
import passportLocal from 'passport-local';
// import { NextFunction, Request, Response } from 'express';

const LocalStrategy = passportLocal.Strategy;
const localOpts = { usernameField: 'email' };

const localLogin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      return done(null, null);
    } catch (e) {
      return done(e, false);
    }
  }
);

passport.use(localLogin);

const authLocal = passport.authenticate('local', {
  session: false
});
const authJwt = passport.authenticate('jwt', {
  session: false
});

export { authLocal, authJwt };
