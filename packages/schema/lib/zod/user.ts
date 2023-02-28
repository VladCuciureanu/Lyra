import * as z from "zod"
import { UserRole, UserStatus } from "@prisma/client"

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  email: z.string(),
  name: z.string().nullish(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
})
