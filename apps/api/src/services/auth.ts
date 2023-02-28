import { database, UserStatus } from '@lyra/schema';
import { BearerTokenRequestDTO, JWTPayload } from '../types/auth';
import argon2 from 'argon2';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials';
import jwt from 'jsonwebtoken';
import env from '../env';
import { UserSuspendedException } from '../exceptions/user-suspended';

async function login(dto: BearerTokenRequestDTO) {
  const user = await database.user.findFirst({ where: { email: dto.email } });

  if (user?.status === UserStatus.INACTIVE) {
    throw new UserSuspendedException();
  }

  if (user && (await argon2.verify(user.password, dto.password))) {
    const payload: JWTPayload = {
      context: {
        user: {
          id: user.id,
          role: user.role,
        },
      },
    };
    return jwt.sign(payload, env.JWT_SECRET);
  }

  throw new InvalidCredentialsException();
}

const authService = { login };
export default authService;
