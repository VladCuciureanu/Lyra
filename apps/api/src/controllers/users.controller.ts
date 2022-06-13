import { NextFunction, Request, Response } from 'express';
import { User, UserRole } from '@prisma/client';
import { CreateUserDto, UpdateUserDto, UserResponse } from '@dtos/users.dto';
import UserService from '@services/users.service';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUser } from '@/interfaces/auth.interface';

class UsersController {
  public userService = new UserService();

  public getUsers = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allUsersData: User[] = await this.userService.findAllUser();
      const response: UserResponse[] = allUsersData.map(user => plainToClass(UserResponse, user));

      res.status(StatusCodes.OK).json(instanceToPlain(response));
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;

      const matchedUserData: User = await this.userService.findUserById(userId);
      const response: UserResponse = plainToClass(UserResponse, matchedUserData);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;

      const createdUserData: User = await this.userService.createUser(userData);
      const response: UserResponse = plainToClass(UserResponse, createdUserData);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const userData: UpdateUserDto = req.body;

      const updatedUserData: User = await this.userService.updateUser(userId, userData);
      const response: UserResponse = plainToClass(UserResponse, updatedUserData);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;

      const deletedUserData: User = await this.userService.deleteUser(userId);
      const response: UserResponse = plainToClass(UserResponse, deletedUserData);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
