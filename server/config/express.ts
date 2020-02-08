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

const app: Application = express();
