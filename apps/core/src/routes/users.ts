import { Router } from 'express';
import usersController from '../controllers/users';
import { authenticate } from '../middlewares/authentication';
import {
  validateCreateUser,
  validateUpdateUser,
} from '../middlewares/validators';

const usersRouter = Router();

usersRouter
  .route('/')
  .get(usersController.getUsers)
  .post(validateCreateUser, usersController.createUser);

usersRouter
  .route('/:id')
  .get(usersController.getUser)
  .patch(authenticate, validateUpdateUser, usersController.updateUser)
  .delete(authenticate, usersController.deleteUser);

export default usersRouter;
