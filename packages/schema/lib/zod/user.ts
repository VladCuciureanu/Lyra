import * as z from "zod"
import { Role } from "@prisma/client"

export const UserSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  email: z.string(),
  name: z.string().nullish(),
  role: z.nativeEnum(Role),
})
