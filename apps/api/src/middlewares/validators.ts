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
import {
  CreateTrackRequestSchema,
  UpdateTrackRequestSchema,
} from '../types/tracks';
import {
  CreatePlaylistRequestSchema,
  UpdatePlaylistRequestSchema,
} from '../types/playlists';

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

// Tracks
export const validateCreateTrack = validate(CreateTrackRequestSchema);
export const validateUpdateTrack = validate(UpdateTrackRequestSchema);

// Playlists
export const validateCreatePlaylist = validate(CreatePlaylistRequestSchema);
export const validateUpdatePlaylist = validate(UpdatePlaylistRequestSchema);
