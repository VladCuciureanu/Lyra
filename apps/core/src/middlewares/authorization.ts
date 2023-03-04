import { UserRole } from '@lyra/schema';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { JWTUserData } from '../types/auth';

export const authorize =
  (roles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = res.locals.user as JWTUserData;
    const role = userData.role;
    if (roles.includes(UserRole[role])) {
      next();
    }
    next(new UnauthorizedException());
  };
