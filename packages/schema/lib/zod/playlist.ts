import * as z from 'zod';
import {
  CompleteUser,
  RelatedUserSchema,
  CompleteTrack,
  RelatedTrackSchema,
} from './index';

export const PlaylistSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),
  name: z
    .string()
    .min(1, { message: "A playlist's name must be longer than 0 characters" })
    .max(127, {
      message: "A playlist's name must be shorter than 128 characters",
    }),
  image: z.string().nullish(),
  private: z.boolean(),
  collaborative: z.boolean(),
});

export interface CompletePlaylist extends z.infer<typeof PlaylistSchema> {
  members: CompleteUser[];
  tracks: CompleteTrack[];
}

/**
 * RelatedPlaylistSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlaylistSchema: z.ZodSchema<CompletePlaylist> = z.lazy(() =>
  PlaylistSchema.extend({
    members: RelatedUserSchema.array(),
    tracks: RelatedTrackSchema.array(),
  })
);
