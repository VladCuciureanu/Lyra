import * as z from 'zod';
import {
  CompleteAlbum,
  RelatedAlbumSchema,
  CompletePlaylist,
  RelatedPlaylistSchema,
  CompleteUser,
  RelatedUserSchema,
} from './index';

export const TrackSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),
  name: z.string(),
  albumId: z.string(),
});

export interface CompleteTrack extends z.infer<typeof TrackSchema> {
  album: CompleteAlbum;
  playlists: CompletePlaylist[];
  likedBy: CompleteUser[];
}

/**
 * RelatedTrackSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTrackSchema: z.ZodSchema<CompleteTrack> = z.lazy(() =>
  TrackSchema.extend({
    album: RelatedAlbumSchema,
    playlists: RelatedPlaylistSchema.array(),
    likedBy: RelatedUserSchema.array(),
  })
);
