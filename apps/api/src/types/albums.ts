import { AlbumSchema } from '@lyra/schema';

export const CreateAlbumRequestSchema = AlbumSchema.pick({
  name: true,
  image: true,
  artistId: true,
}).strict();

export const UpdateAlbumRequestSchema = AlbumSchema.pick({
  name: true,
  image: true,
  artistId: true,
})
  .partial()
  .strict();

export type CreateAlbumRequestDTO = Zod.infer<typeof CreateAlbumRequestSchema>;

export type UpdateAlbumRequestDTO = Zod.infer<typeof UpdateAlbumRequestSchema>;
