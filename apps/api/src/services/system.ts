import { database, UserStatus } from '@lyra/schema';
import { BearerTokenRequestDTO, JWTPayload } from '../types/auth';
import argon2 from 'argon2';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials';
import jwt from 'jsonwebtoken';
import env from '../env';
import { UserSuspendedException } from '../exceptions/user-suspended';

async function ping() {
  return '🏓 Pong!';
}

const systemService = { ping };
export default systemService;
