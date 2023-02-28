import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../env';
import { JWTPayload } from '../types/auth';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    const payload: JWTPayload = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    res.locals.user = payload.context.user;
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'Invalid or expired JWT token.',
      error: error,
    });
  }
};
