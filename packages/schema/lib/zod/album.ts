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
  name: z.string(),
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
