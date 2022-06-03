import { NextFunction, Request, Response } from 'express';
import { UserDto } from '@dtos/users.dto';
import { TokenData } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserDto = req.body;
      const tokenData: TokenData = await this.authService.login(userData);

      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
