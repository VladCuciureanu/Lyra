import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { InvalidTokenException } from '../exceptions/invalid-token';
import { TokenExpiredException } from '../exceptions/token-expired';
import { Request, Response, NextFunction } from 'express';
import { JWTPayload } from '../types/auth';
import env from '../env';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    // const cookies = parseCookies(req.headers.cookie!);
    // const token = cookies['token'];
    const payload: JWTPayload = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    res.locals.user = payload.context.user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new TokenExpiredException(error.message));
    }
    if (error instanceof JsonWebTokenError) {
      next(new InvalidTokenException(error.message));
    }
    next(error);
  }
};
