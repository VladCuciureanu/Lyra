import { NextFunction, Request, Response } from 'express';
import { UserDto } from '@dtos/users.dto';
import { TokenData } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  public authService = new AuthService();

  public getToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserDto = req.body;
      const tokenData: TokenData = await this.authService.requestToken(userData);

      res.status(StatusCodes.OK).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
