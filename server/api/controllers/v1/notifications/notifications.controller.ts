import { Request, Response } from '../../../../types/express.extensions';
import EventEmitter from 'events';

const myEmitter = new EventEmitter();

export default class NotificationController {
  /**
   * @stream - events
   */
  public noti = (req: Request, res: Response): void => {
    const connectedId = req.params.id;

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    myEmitter.on('event', (data) => {
      if (data.id === connectedId)
        res.write('data: ' + connectedId + ' ' + Math.random() * 10 + '\n\n');
    });
  };

  /**
   * @body - event Object
   */
  public addEvent = (req: Request, res: Response): void => {
    myEmitter.emit('event', {
      id: req.body.id,
    });
    res.send({
      msg: 'event created @addEvent function',
    });
  };
}
