import { UserRole } from '@lyra/schema';
import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { UnauthorizedException } from '../exceptions/unauthorized';
import usersService from '../services/users';
import { JWTUserData } from '../types/auth';

const getUsers: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await usersService.getUsers());
});

const createUser: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await usersService.createUser(req.body));
});

const getUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const currentUser = res.locals.user as JWTUserData;
  const bypassPrivacy = userId === currentUser?.id;

  res.send(await usersService.getUser(userId, bypassPrivacy));
});

const updateUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const currentUser = res.locals.user as JWTUserData;

  if (userId !== currentUser.id && currentUser.role !== UserRole.ADMIN) {
    next(new UnauthorizedException());
  }

  res.send(await usersService.updateUser(userId, req.body));
});

const deleteUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const currentUser = res.locals.user as JWTUserData;

  if (userId !== currentUser.id && currentUser.role !== UserRole.ADMIN) {
    next(new UnauthorizedException());
  }

  res.send(await usersService.deleteUser(userId));
});

const usersController = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};

export default usersController;
