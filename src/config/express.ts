import { boomify, isBoom } from '@hapi/boom';
import { errors } from 'celebrate';
import cors from 'cors';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  static as useStatic
} from 'express';
import v1Router from '../api';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger/docs_generator';
import appRoot from 'app-root-path';

const app: Application = express();

app.use((req, res, next) => {
  console.log('--------->', req.method, req.url);
  next();
});

app.use(useStatic(`${appRoot}/public`));

// Body parser
app.use(express.json());

// cors
app.use(cors());

// routes
app.use('/api/v1', v1Router);
// app.use('/api/vv2', v2Router);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Common error formater
app.use(errors());
app.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default app;
