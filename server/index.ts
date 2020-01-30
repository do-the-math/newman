import { bootstrapMicroframework } from 'microframework';
import { corsLoader } from './loaders/cors.loader';
import { serverLoader } from './loaders/server.loader';
import { initLoader } from './loaders/init.loader';
import { mongooseLoader } from './loaders/mongoose.loader';
import { swaggerLoader } from './loaders/swagger.loader';
import { logError, logInfo } from './utils/log';

bootstrapMicroframework({
  config: {
    showBootstrapTime: true
  },
  loaders: [
    initLoader,
    corsLoader,
    swaggerLoader,

    // DB Loader
    mongooseLoader,

    // start server after all middlewares
    serverLoader
  ]
})
  .then(() => {
    logInfo('All Loaders Loaded');
  })
  .catch((error) => {
    logError('application erry', error);
  });
