import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import albumsService from '../services/albums';

const getAlbums: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await albumsService.getAlbums());
});

const createAlbum: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await albumsService.createAlbum(req.body));
});

const getAlbum: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await albumsService.getAlbum(req.params.id));
});

const updateAlbum: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await albumsService.updateAlbum(req.params.id, req.body));
});

const deleteAlbum: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await albumsService.deleteAlbum(req.params.id));
});

const albumsController = {
  getAlbums,
  createAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum,
};

export default albumsController;
