import swaggerJSdocs from 'swagger-jsdoc';
import config from '../config';

const isLocalDev = true;
const envPath = isLocalDev ? 'server' : 'dist';
const routesPath = [
  `./${envPath}/api/controllers/**/*.route.*`,
  `./${envPath}/api/controllers/**/*.swagger.*`
];

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
