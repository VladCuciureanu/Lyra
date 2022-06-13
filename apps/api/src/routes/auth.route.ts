import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { UserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}token`, validationMiddleware(UserDto, 'body'), this.authController.getToken);
    //TODO(Vlad): Add DELETE /token endpoint
  }
}

export default AuthRoute;
