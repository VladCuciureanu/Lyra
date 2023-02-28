import { database } from '@lyra/schema';
import { CreateUserRequestDTO, UpdateUserRequestDTO } from '../types/users';
import argon2 from 'argon2';

async function getUsers() {
  return database.user.findMany({ select: { ...selectOptions, email: false } });
}

async function createUser(dto: CreateUserRequestDTO) {
  dto.password = await argon2.hash(dto.password);

  return database.user.create({
    data: dto,
    select: selectOptions,
  });
}

async function getUser(id: string, bypassPrivacy: boolean) {
  return database.user.findFirst({
    where: { id: id },
    select: { ...selectOptions, email: bypassPrivacy },
  });
}

async function updateUser(id: string, dto: UpdateUserRequestDTO) {
  if (dto.password) {
    dto.password = await argon2.hash(dto.password);
  }

  return database.user.update({
    where: { id: id },
    data: dto,
    select: selectOptions,
  });
}

async function deleteUser(id: string) {
  return database.user.delete({
    where: { id: id },
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

const usersService = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
export default usersService;
