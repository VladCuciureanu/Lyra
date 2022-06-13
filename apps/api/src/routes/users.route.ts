import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authMiddleware as Authorize, ownerOrRoleMiddleware as OwnerOrRole } from '@/middlewares/auth.middleware';
import { injectCurrentUserIdMiddleware as UseCurrentUser } from '@/middlewares/routing.middleware';
import { uuidRegex } from '@/utils/util';
import { UserRole } from '@prisma/client';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(${uuidRegex})`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.patch(
      `${this.path}/:id(${uuidRegex})`,
      Authorize,
      OwnerOrRole(UserRole.ADMIN),
      validationMiddleware(UpdateUserDto, 'body', true),
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/:id(${uuidRegex})`, Authorize, OwnerOrRole(UserRole.ADMIN), this.usersController.deleteUser);

    // Shortcuts
    this.router.get(`${this.path}/@me`, Authorize, UseCurrentUser, this.usersController.getUserById);
    this.router.patch(
      `${this.path}/@me`,
      Authorize,
      UseCurrentUser,
      validationMiddleware(UpdateUserDto, 'body', true),
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/@me`, Authorize, UseCurrentUser, this.usersController.deleteUser);
  }
}

export default UsersRoute;
