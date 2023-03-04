import * as z from 'zod';
import {
  CompleteAlbum,
  RelatedAlbumSchema,
  CompleteUser,
  RelatedUserSchema,
} from './index';

export const ArtistSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),
  name: z
    .string()
    .min(1, { message: "An artist's name must be longer than 0 characters" })
    .max(127, {
      message: "An artist's name must be shorter than 128 characters",
    }),
  image: z.string().nullish(),
});

export interface CompleteArtist extends z.infer<typeof ArtistSchema> {
  albums: CompleteAlbum[];
  followers: CompleteUser[];
}

/**
 * RelatedArtistSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedArtistSchema: z.ZodSchema<CompleteArtist> = z.lazy(() =>
  ArtistSchema.extend({
    albums: RelatedAlbumSchema.array(),
    followers: RelatedUserSchema.array(),
  })
);
