import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validate } from '../middlewares/schema-validation';
import { login } from '../services/auth';
import { BearerTokenRequestSchema } from '../types/auth';

const authRouter = Router();

authRouter.get(
  '/token',
  validate(BearerTokenRequestSchema),
  asyncHandler(async (req, res, next) => {
    res.send(await login(req.body));
  })
);

export default authRouter;
