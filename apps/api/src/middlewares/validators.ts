import { validate } from './schema-validation';
import { BearerTokenRequestSchema } from '../types/auth';
import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from '../types/users';
import {
  CreateAlbumRequestSchema,
  UpdateAlbumRequestSchema,
} from '../types/albums';

// Auth
export const validateLogin = validate(BearerTokenRequestSchema);

// Users
export const validateCreateUser = validate(CreateUserRequestSchema);
export const validateUpdateUser = validate(UpdateUserRequestSchema);

// Albums
export const validateCreateAlbum = validate(CreateAlbumRequestSchema);
export const validateUpdateAlbum = validate(UpdateAlbumRequestSchema);
