import { bootstrapMicroframework } from 'microframework';
import { corsLoader } from './loaders/cors.loader';
import { serverLoader } from './loaders/server.loader';
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

    // DB Loader
    mongooseLoader,

    // start server after all middlewares
    serverLoader
  ]
})
  .then(() => {
    logInfo('Start Development');
  })
  .catch((error) => {
    logError('application erry', error);
  });
