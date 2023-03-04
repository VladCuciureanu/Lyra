import { database } from '@lyra/schema';
import {
  CreateArtistRequestDTO,
  UpdateArtistRequestDTO,
} from '../types/artists';
import { NotFoundException } from '../exceptions/not-found';

async function getArtists() {
  return database.artist.findMany();
}

async function createArtist(dto: CreateArtistRequestDTO) {
  return database.artist.create({
    data: dto,
  });
}

async function getArtist(id: string) {
  const artist = await database.artist.findFirst({
    where: { id: id },
  });

  if (!artist) {
    throw new NotFoundException();
  }

  return artist;
}

async function updateArtist(id: string, dto: UpdateArtistRequestDTO) {
  const artist = await database.artist.findFirst({ where: { id: id } });

  if (!artist) {
    throw new NotFoundException();
  }

  return database.artist.update({
    where: { id: id },
    data: dto,
  });
}

async function deleteArtist(id: string) {
  const artist = await database.artist.findFirst({ where: { id: id } });

  if (!artist) {
    throw new NotFoundException();
  }

  return database.artist.delete({
    where: { id: id },
  });
}

const artistsService = {
  getArtists,
  createArtist,
  getArtist,
  updateArtist,
  deleteArtist,
};
export default artistsService;
