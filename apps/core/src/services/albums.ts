import { database } from '@lyra/schema';
import { CreateAlbumRequestDTO, UpdateAlbumRequestDTO } from '../types/albums';
import { NotFoundException } from '../exceptions/not-found';

async function getAlbums() {
  return database.album.findMany();
}

async function createAlbum(dto: CreateAlbumRequestDTO) {
  return database.album.create({
    data: dto,
  });
}

async function getAlbum(id: string) {
  const album = await database.album.findFirst({
    where: { id: id },
  });

  if (!album) {
    throw new NotFoundException();
  }

  return album;
}

async function updateAlbum(id: string, dto: UpdateAlbumRequestDTO) {
  const album = await database.album.findFirst({ where: { id: id } });

  if (!album) {
    throw new NotFoundException();
  }

  return database.album.update({
    where: { id: id },
    data: dto,
  });
}

async function deleteAlbum(id: string) {
  const album = await database.album.findFirst({ where: { id: id } });

  if (!album) {
    throw new NotFoundException();
  }

  return database.album.delete({
    where: { id: id },
  });
}

const albumsService = {
  getAlbums,
  createAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum,
};
export default albumsService;
