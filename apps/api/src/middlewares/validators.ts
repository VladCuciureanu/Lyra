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
import {
  CreateArtistRequestSchema,
  UpdateArtistRequestSchema,
} from '../types/artists';

// Auth
export const validateLogin = validate(BearerTokenRequestSchema);

// Users
export const validateCreateUser = validate(CreateUserRequestSchema);
export const validateUpdateUser = validate(UpdateUserRequestSchema);

// Albums
export const validateCreateAlbum = validate(CreateAlbumRequestSchema);
export const validateUpdateAlbum = validate(UpdateAlbumRequestSchema);

// Artists
export const validateCreateArtist = validate(CreateArtistRequestSchema);
export const validateUpdateArtist = validate(UpdateArtistRequestSchema);
