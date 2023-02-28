import { database } from '@lyra/schema';
import { CreateUserRequestDTO, UpdateUserRequestDTO } from '../types/users';
import argon2 from 'argon2';
import { NotFoundException } from '../exceptions/not-found';

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
  const user = await database.user.findFirst({
    where: { id: id },
    select: { ...selectOptions, email: bypassPrivacy },
  });

  if (!user) {
    throw new NotFoundException();
  }

  return user;
}

async function updateUser(id: string, dto: UpdateUserRequestDTO) {
  const user = await database.user.findFirst({ where: { id: id } });

  if (!user) {
    throw new NotFoundException();
  }

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
  const user = await database.user.findFirst({ where: { id: id } });

  if (!user) {
    throw new NotFoundException();
  }

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
