import { database } from '@lyra/schema';
import {
  CreateUserRequestDTO,
  DeleteUserRequestDTO,
  UpdateUserRequestDTO,
} from '../types/users';
import argon2 from 'argon2';

export async function getUsers() {
  return database.user.findMany({ select: { ...selectOptions, email: false } });
}

export async function getUser(userId: string) {
  return database.user.findFirst({
    where: { id: userId },
    select: { ...selectOptions, email: false },
  });
}

export async function createUser(dto: CreateUserRequestDTO) {
  dto.password = await argon2.hash(dto.password);

  return database.user.create({
    data: dto,
    select: selectOptions,
  });
}

export async function updateUser(dto: UpdateUserRequestDTO) {
  if (dto.password) {
    dto.password = await argon2.hash(dto.password);
  }

  return database.user.update({
    where: { id: dto.id },
    data: dto,
    select: selectOptions,
  });
}

export async function deleteUser(dto: DeleteUserRequestDTO) {
  return database.user.delete({
    where: { id: dto.id },
    select: selectOptions,
  });
}

const selectOptions = {
  id: true,
  name: true,
  status: true,
  role: true,
  email: true,
  createdAt: false,
  password: false,
};
