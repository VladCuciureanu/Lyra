import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validate } from '../middlewares/schema-validation';
import {
  CreateUserRequestSchema,
  DeleteUserRequestDTO,
  DeleteUserRequestSchema,
  UpdateUserRequestDTO,
  UpdateUserRequestSchema,
} from '../types/users';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../services/users';
import { authenticate } from '../middlewares/authentication';
import { JWTUserData } from '../types/auth';
import { UnauthorizedException } from '../exceptions/unauthorized';

const usersRouter = Router();

usersRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.send(await getUsers());
  })
);

usersRouter.post(
  '/',
  validate(CreateUserRequestSchema),
  asyncHandler(async (req, res, next) => {
    res.send(await createUser(req.body));
  })
);

usersRouter.patch(
  '/',
  authenticate,
  validate(UpdateUserRequestSchema),
  asyncHandler(async (req, res, next) => {
    const dto = req.body as UpdateUserRequestDTO;
    const userData: JWTUserData = res.locals.user;
    if (userData.id === dto.id) {
      res.send(await updateUser(req.body));
    } else {
      next(new UnauthorizedException());
    }
  })
);

usersRouter.delete(
  '/',
  authenticate,
  validate(DeleteUserRequestSchema),
  asyncHandler(async (req, res, next) => {
    const dto = req.body as DeleteUserRequestDTO;
    const userData: JWTUserData = res.locals.user;
    if (userData.id === dto.id) {
      res.send(await deleteUser(req.body));
    }
    next(new UnauthorizedException());
  })
);

export default usersRouter;
