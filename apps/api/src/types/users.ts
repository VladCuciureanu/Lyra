import { UserSchema } from '@lyra/schema';

const BaseUserSchema = UserSchema.pick({ id: true });

export const CreateUserRequestSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
}).strict();

export const UpdateUserRequestSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
})
  .partial()
  .extend(BaseUserSchema.shape)
  .strict();

export type CreateUserRequestDTO = Zod.infer<typeof CreateUserRequestSchema>;

export type UpdateUserRequestDTO = Zod.infer<typeof UpdateUserRequestSchema>;
