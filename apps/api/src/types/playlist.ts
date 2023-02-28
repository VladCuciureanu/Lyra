import { PlaylistSchema } from '@lyra/schema';

export const CreatePlaylistRequestSchema = PlaylistSchema.pick({
  name: true,
  image: true,
}).strict();

export const UpdatePlaylistRequestSchema = PlaylistSchema.pick({
  name: true,
  image: true,
  private: true,
  collaborative: true,
})
  .partial()
  .strict();

export type CreatePlaylistRequestDTO = Zod.infer<
  typeof CreatePlaylistRequestSchema
>;

export type UpdatePlaylistRequestDTO = Zod.infer<
  typeof UpdatePlaylistRequestSchema
>;
