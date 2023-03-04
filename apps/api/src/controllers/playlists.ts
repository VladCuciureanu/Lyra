import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import playlistsService from '../services/playlists';

const getPlaylists: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await playlistsService.getPlaylists());
});

const createPlaylist: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await playlistsService.createPlaylist(req.body));
});

const getPlaylist: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await playlistsService.getPlaylist(req.params.id));
});

const updatePlaylist: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await playlistsService.updatePlaylist(req.params.id, req.body));
});

const deletePlaylist: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await playlistsService.deletePlaylist(req.params.id));
});

const playlistsController = {
  getPlaylists,
  createPlaylist,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
};

export default playlistsController;
