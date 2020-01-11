/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';

interface Request extends express.Request {
  user?: any;
}
type Response = express.Response;
type Next = express.NextFunction;

export { Request, Response, Next };
