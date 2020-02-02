import { boomify, isBoom } from '@hapi/boom';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  static as useStatic
} from 'express';
import BasicAuth from 'express-basic-auth';
import helmet from 'helmet';
import mongoose from 'mongoose';
import * as path from 'path';
import Swaggerjsdoc from 'swagger-jsdoc';
import Swaggeruiexpress from 'swagger-ui-express';
import config from './config/config';
import v1Router from './api/controllers/v1';
import { logError, logInfo } from './utils/log';

const app: Application = express();
const root = path.normalize(`${__dirname}/..`);

app.use(useStatic(`${root}/public`));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
const whitelist = config.WHITE_LIST_URL;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  maxAge: 3600
};
app.use(cors(corsOptions));
const isLocalDev = true;

// path for api specs
const envPath = isLocalDev ? 'server' : 'dist';
const routesPath = [
  `./${envPath}/api/controllers/**/*.route.*`,
  `./${envPath}/api/controllers/**/*.swagger.*`
];

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: config.APP_NAME,
      version: '1.0.0',
      description: 'Newman API Server Documentation',
      license: {
        name: 'Aman Nidhi',
        url: 'https://www.aman.com'
      }
    },
    basePath: '/api/v1',
    servers: [
      {
        url: config.ROUTE_URL_V1,
        description: 'v1'
      }
    ],
    components: {
      securitySchemes: {
        JwtTokenAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  },
  apis: routesPath
};

const swaggerdocs = Swaggerjsdoc(options);

app.use(
  config.SWAGGER_ROUTE,
  // do not ask password when in local
  config.NODE_ENV === 'local'
    ? BasicAuth({
        users: {
          [`${config.SWAGGER_USERNAME}`]: config.SWAGGER_PASSWORD
        },
        challenge: true
      })
    : (req: Request, res: Response, next: NextFunction) =>
        next(),
  Swaggeruiexpress.serve,
  Swaggeruiexpress.setup(swaggerdocs)
);

// swagger in the route
app.get(
  config.SWAGGER_SPEC,
  (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(swaggerdocs, null, 1));
  }
);

mongoose.connect(config.MONGO_DB_HOST as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
});

app.use('/api/v1', v1Router);

/* Error Middleware after routes */
app.use(errors());
app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let boomed = null;
    if (!isBoom(err)) {
      const errorResponse = {
        statusCode: err.status || 500,
        message: err.message
      };

      boomed = boomify(err, errorResponse);
    } else {
      boomed = err;
    }

    return res
      .status(boomed.output.statusCode)
      .json(
        Object.assign(boomed.output.payload, boomed.data)
      );
  }
);

app.listen(config.PORT, (error) => {
  if (error) {
    logError(`---  error`, error);
  }

  logInfo(`server running on port ${config.PORT}`);
});

export default app;
