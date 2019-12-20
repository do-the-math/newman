import { Request, Response } from '../../../../types/express.extensions';

export default class AuthController {
  public login = (req: Request, res: Response): void => {
    res.send('authentication');
  };
}
