import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import authService from '../services/auth';

const login: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await authService.login(req.body));
});

const authController = {
  login,
};

export default authController;
