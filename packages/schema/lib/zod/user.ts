import * as z from 'zod';
import { UserRole, UserStatus } from '@prisma/client';
import {
  CompletePlaylist,
  RelatedPlaylistSchema,
  CompleteArtist,
  RelatedArtistSchema,
  CompleteTrack,
  RelatedTrackSchema,
} from './index';

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),
  email: z.string().email({ message: 'Invalid email address' }),
  name: z
    .string()
    .min(4, { message: "A user's name must be longer than 3 characters" })
    .max(127, { message: "A user's name must be shorter than 128 characters" })
    .nullish(),
  password: z.string(),
  image: z.string().nullish(),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
});

export interface CompleteUser extends z.infer<typeof UserSchema> {
  playlists: CompletePlaylist[];
  followedArtists: CompleteArtist[];
  likedTracks: CompleteTrack[];
}

/**
 * RelatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserSchema.extend({
    playlists: RelatedPlaylistSchema.array(),
    followedArtists: RelatedArtistSchema.array(),
    likedTracks: RelatedTrackSchema.array(),
  })
);
