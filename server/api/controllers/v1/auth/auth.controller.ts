import 'reflect-metadata';
import {
  Controller,
  Get,
  HttpCode,
  OnUndefined,
  Post,
  Req,
  Res,
} from 'routing-controllers';
import { Request, Response } from './../../../../types/express.extensions';

@Controller(`/v1/auth`)
export class AuthController {
  @HttpCode(200)
  @Get('/')
  @OnUndefined(404)
  getAll(@Req() request: Request, @Res() response: Response): any {
    return undefined;
  }

  @Post('/')
  @HttpCode(201)
  getOne(): string {
    return 'This action returns user #';
  }
}
