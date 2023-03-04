import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import tracksService from '../services/tracks';

const getTracks: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await tracksService.getTracks());
});

const createTrack: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await tracksService.createTrack(req.body));
});

const getTrack: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await tracksService.getTrack(req.params.id));
});

const updateTrack: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await tracksService.updateTrack(req.params.id, req.body));
});

const deleteTrack: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(await tracksService.deleteTrack(req.params.id));
});

const tracksController = {
  getTracks,
  createTrack,
  getTrack,
  updateTrack,
  deleteTrack,
};

export default tracksController;
