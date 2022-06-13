import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaClient, UserRole } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { StatusCodes } from 'http-status-codes';

export const authMiddleware = async (req: RequestWithUser, _: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;

      const users = new PrismaClient().user;
      const matchedUserData = await users.findUnique({ where: { id: userId } });

      if (matchedUserData) {
        req.user = matchedUserData;
        next();
      } else {
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(StatusCodes.NOT_FOUND, 'Authentication token missing'));
    }
  } catch (error) {
    next(error);
  }
};

export const roleMiddleware = (role: UserRole) => {
  return function (req: RequestWithUser, _: Response, next: NextFunction) {
    try {
      if (role !== req.user.role) {
        next(new HttpException(StatusCodes.FORBIDDEN, 'Unauthorized operation.'));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const ownerOrRoleMiddleware = (role: UserRole) => {
  return function (req: RequestWithUser, _: Response, next: NextFunction) {
    try {
      if (req.params.id === req.user.id) {
        next();
      }
      return roleMiddleware(role)(req, _, next);
    } catch (error) {
      next(error);
    }
  };
};
