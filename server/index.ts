import { bootstrapMicroframework } from 'microframework';
import { expressLoader } from './loaders/express.loader';
import { corsLoader } from './loaders/cors.loader';
import { routesLoader } from './loaders/routes.loader';
import { initLoader } from './loaders/init.loader';
import { publicLoader } from './loaders/public.loader';
import { logError, logInfo } from './utils/log';

bootstrapMicroframework({
  config: {
    showBootstrapTime: true,
  },
  loaders: [
    initLoader,
    corsLoader,
    publicLoader,
    routesLoader,

    // last
    expressLoader,
  ],
})
  .then(() => {
    logInfo('application bootstraped');
  })
  .catch((err) => {
    logError('application erry', err);
  });
