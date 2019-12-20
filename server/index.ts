import { bootstrapMicroframework } from 'microframework';
import { expressLoader } from './loaders/express.loader';
import { corsLoader } from './loaders/cors.loader';
import { helmetLoader } from './loaders/helmet.loader';
import { initLoader } from './loaders/init.loader';
import { logError, logInfo } from './utils/log';

bootstrapMicroframework({
  config: {
    showBootstrapTime: true,
  },
  loaders: [
    initLoader,
    corsLoader,
    expressLoader,

    // start app
  ],
})
  .then((e) => {
    logInfo('application bootstraped');
  })
  .catch((err) => {
    logError('application erry', err);
  });
