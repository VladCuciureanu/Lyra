import { RequestWithUser } from '@/interfaces/auth.interface';
import { Response, NextFunction } from 'express';

export const injectCurrentUserIdMiddleware = async (req: RequestWithUser, _: Response, next: NextFunction) => {
  try {
    req.params.id = req.user.id;
    next();
  } catch (error) {
    next(error);
  }
};
