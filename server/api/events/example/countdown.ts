import { Response } from 'express';
import { Request } from '../../../types/express.extensions';

function countdown(res, count): any {
  res.write('data: ' + count + '\n\n');
  if (count) setTimeout(() => countdown(res, count - 1), 1000);
  else res.end();
}

const exampleSSE = (req: Request, res: Response): void => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  countdown(res, 10);
};

export { exampleSSE };
