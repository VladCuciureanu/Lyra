import { database } from '@lyra/schema';
import {
  CreatePlaylistRequestDTO,
  UpdatePlaylistRequestDTO,
} from '../types/playlists';
import { NotFoundException } from '../exceptions/not-found';

async function getPlaylists() {
  return database.playlist.findMany();
}

async function createPlaylist(dto: CreatePlaylistRequestDTO) {
  return database.playlist.create({
    data: dto,
  });
}

async function getPlaylist(id: string) {
  const playlist = await database.playlist.findFirst({
    where: { id: id },
  });

  if (!playlist) {
    throw new NotFoundException();
  }

  return playlist;
}

async function updatePlaylist(id: string, dto: UpdatePlaylistRequestDTO) {
  const playlist = await database.playlist.findFirst({ where: { id: id } });

  if (!playlist) {
    throw new NotFoundException();
  }

  return database.playlist.update({
    where: { id: id },
    data: dto,
  });
}

async function deletePlaylist(id: string) {
  const playlist = await database.playlist.findFirst({ where: { id: id } });

  if (!playlist) {
    throw new NotFoundException();
  }

  return database.playlist.delete({
    where: { id: id },
  });
}

const playlistsService = {
  getPlaylists,
  createPlaylist,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
};
export default playlistsService;
