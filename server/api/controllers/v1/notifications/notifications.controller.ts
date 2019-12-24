import EventEmitter from 'events';
import 'reflect-metadata';
import { Get, JsonController, Post, Req, Res } from 'routing-controllers';
import { Request, Response } from './../../../../types/express.extensions';

const myEmitter = new EventEmitter();
@JsonController(`/v1/notifications`)
export class NotificationController {
  /**
   * streamEvent
   */
  @Get('/stream/:id')
  streamEvent(@Req() request: Request, @Res() response: Response): void {
    const connectedId = request.params.id;

    response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    myEmitter.on('event', (data) => {
      if (data.id === connectedId)
        response.write(
          'data: ' + connectedId + ' ' + Math.random() * 10 + '\n\n',
        );
    });
  }

  /**
   * receiveEvent
   */
  @Post('/')
  receiveEvent(@Req() request: Request, @Res() response: Response): any {
    myEmitter.emit('event', {
      id: request.body.id,
    });
    return {
      msg: 'event created @addEvent function',
    };
  }
}
