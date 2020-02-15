import swaggerJSdocs from 'swagger-jsdoc';
import config from '../config';
import appRoot from 'app-root-path';

const routesPath = ['**/api/**/*.ts'];

export default swaggerJSdocs({
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: config.APP_NAME,
      version: '1.0.0',
      description: 'Newman API Server Documentation'
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
});
