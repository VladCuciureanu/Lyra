import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
