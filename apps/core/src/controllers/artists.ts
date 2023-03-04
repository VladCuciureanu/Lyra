import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import artistsService from '../services/artists';

const getArtists: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await artistsService.getArtists());
});

const createArtist: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await artistsService.createArtist(req.body));
});

const getArtist: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await artistsService.getArtist(req.params.id));
});

const updateArtist: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await artistsService.updateArtist(req.params.id, req.body));
});

const deleteArtist: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await artistsService.deleteArtist(req.params.id));
});

const artistsController = {
  getArtists,
  createArtist,
  getArtist,
  updateArtist,
  deleteArtist,
};

export default artistsController;
