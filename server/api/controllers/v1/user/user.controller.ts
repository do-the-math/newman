import 'reflect-metadata';
import {
  Controller,
  Get,
  HttpCode,
  OnUndefined,
  Post,
  Req,
  Res
} from 'routing-controllers';
import { Request, Response } from '../../../../types/express.extensions';

@Controller(`/v1/users`)
export class UserController {
  @Post('/')
  createOne(@Req() request: Request, @Res() response: Response): any {
    return 'This action returns user #';
  }

  @Get('/')
  getAll(@Req() request: Request, @Res() response: Response): any {
    // response.send('sdfgfad');
    return 'This action returns user #';
  }

  @Post('/')
  getOne(): string {
    return 'This action returns user #';
  }
}
