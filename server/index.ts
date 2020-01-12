import { bootstrapMicroframework } from 'microframework';
import { corsLoader } from './loaders/cors.loader';
import { expressLoader } from './loaders/express.loader';
import { initLoader } from './loaders/init.loader';
import { mongooseLoader } from './loaders/mongoose.loader';
import { publicLoader } from './loaders/public.loader';
import { swaggerLoader } from './loaders/swagger.loader';
import { logError, logInfo } from './utils/log';

bootstrapMicroframework({
  config: {
    showBootstrapTime: true
  },
  loaders: [
    initLoader,
    corsLoader,
    publicLoader,
    swaggerLoader,

    // db loader
    mongooseLoader,

    // start server after all middlewares
    expressLoader
  ]
})
  .then((e) => {
    logInfo('Start Development');
  })
  .catch((err) => {
    logError('application erry', err);
  });
