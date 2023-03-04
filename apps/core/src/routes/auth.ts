import { Router } from 'express';
import authController from '../controllers/auth';
import { validate } from '../middlewares/schema-validation';
import { BearerTokenRequestSchema } from '../types/auth';

const authRouter = Router();

authRouter
  .route('/token')
  .get(validate(BearerTokenRequestSchema), authController.login);

export default authRouter;
