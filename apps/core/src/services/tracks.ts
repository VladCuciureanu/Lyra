import { database } from '@lyra/schema';
import { CreateTrackRequestDTO, UpdateTrackRequestDTO } from '../types/tracks';
import { NotFoundException } from '../exceptions/not-found';

async function getTracks() {
  return database.track.findMany();
}

async function createTrack(dto: CreateTrackRequestDTO) {
  return database.track.create({
    data: dto,
  });
}

async function getTrack(id: string) {
  const track = await database.track.findFirst({
    where: { id: id },
  });

  if (!track) {
    throw new NotFoundException();
  }

  return track;
}

async function updateTrack(id: string, dto: UpdateTrackRequestDTO) {
  const track = await database.track.findFirst({ where: { id: id } });

  if (!track) {
    throw new NotFoundException();
  }

  return database.track.update({
    where: { id: id },
    data: dto,
  });
}

async function deleteTrack(id: string) {
  const track = await database.track.findFirst({ where: { id: id } });

  if (!track) {
    throw new NotFoundException();
  }

  return database.track.delete({
    where: { id: id },
  });
}

const tracksService = {
  getTracks,
  createTrack,
  getTrack,
  updateTrack,
  deleteTrack,
};
export default tracksService;
