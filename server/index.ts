import { bootstrapMicroframework } from 'microframework';
import { expressLoader } from './loaders/express.loader';
import { corsLoader } from './loaders/cors.loader';
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

    // Express Loaded at last
    expressLoader,
  ],
})
  .then(() => {
    logInfo('Application is Up and Running');
  })
  .catch((err) => {
    logError('application erry', err);
  });
