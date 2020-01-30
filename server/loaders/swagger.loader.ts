/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import BasicAuth from 'express-basic-auth';
import {
  MicroframeworkLoader,
  MicroframeworkSettings
} from 'microframework';
import Swaggerjsdoc from 'swagger-jsdoc';
import Swaggeruiexpress from 'swagger-ui-express';
import config from '../config/config';
import { logConsole } from '../utils/log';

export const swaggerLoader: MicroframeworkLoader | any = (
  settings: MicroframeworkSettings | undefined
): any => {
  const loaderName = 'swaggerLoader';
  return new Promise((resolve, reject) => {
    const app = settings!.getData('express_app');
    const isLocalDev = settings!.getData('isLocalDev');

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
        : (
            req: Request,
            res: Response,
            next: NextFunction
          ) => next(),
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

    logConsole(`--- ${loaderName} loaded`);
    resolve();
  });
};
