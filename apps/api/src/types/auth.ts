import { UserSchema } from '@lyra/schema';
import jwt from 'jsonwebtoken';

export type JWTPayload = jwt.JwtPayload & {
  context: {
    user: JWTUserData;
  };
};

export type JWTUserData = {
  id: Zod.infer<typeof UserSchema.shape.id>;
  role: Zod.infer<typeof UserSchema.shape.role>;
};

export const BearerTokenRequestSchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export type BearerTokenRequestDTO = Zod.infer<typeof BearerTokenRequestSchema>;
