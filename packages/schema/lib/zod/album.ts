import * as z from 'zod';
import {
  CompleteArtist,
  RelatedArtistSchema,
  CompleteTrack,
  RelatedTrackSchema,
} from './index';

export const AlbumSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),
  name: z
    .string()
    .min(1, { message: "An album's name must be longer than 0 characters" })
    .max(255, {
      message: "An album's name must be shorter than 256 characters",
    }),
  image: z.string().nullish(),
  artistId: z.string(),
});

export interface CompleteAlbum extends z.infer<typeof AlbumSchema> {
  artist: CompleteArtist;
  tracks: CompleteTrack[];
}

/**
 * RelatedAlbumSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAlbumSchema: z.ZodSchema<CompleteAlbum> = z.lazy(() =>
  AlbumSchema.extend({
    artist: RelatedArtistSchema,
    tracks: RelatedTrackSchema.array(),
  })
);
