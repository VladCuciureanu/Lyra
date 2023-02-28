import { validate } from './schema-validation';
import { BearerTokenRequestSchema } from '../types/auth';
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from '../types/users';

export const validateLogin = validate(BearerTokenRequestSchema);

export const validateCreateUser = validate(CreateUserRequestSchema);

export const validateUpdateUser = validate(UpdateUserRequestSchema);
