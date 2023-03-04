import { ArtistSchema } from '@lyra/schema';

export const CreateArtistRequestSchema = ArtistSchema.pick({
  name: true,
  image: true,
}).strict();

export const UpdateArtistRequestSchema = ArtistSchema.pick({
  name: true,
  image: true,
})
  .partial()
  .strict();

export type CreateArtistRequestDTO = Zod.infer<
  typeof CreateArtistRequestSchema
>;

export type UpdateArtistRequestDTO = Zod.infer<
  typeof UpdateArtistRequestSchema
>;
