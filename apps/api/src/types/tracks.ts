import { TrackSchema } from '@lyra/schema';

export const CreateTrackRequestSchema = TrackSchema.pick({
  name: true,
  uri: true,
  albumId: true,
}).strict();

export const UpdateTrackRequestSchema = TrackSchema.pick({
  name: true,
  uri: true,
  albumId: true,
})
  .partial()
  .strict();

export type CreateTrackRequestDTO = Zod.infer<typeof CreateTrackRequestSchema>;

export type UpdateTrackRequestDTO = Zod.infer<typeof UpdateTrackRequestSchema>;
