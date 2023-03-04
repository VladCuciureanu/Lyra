import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import systemService from '../services/system';

const ping: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send(systemService.ping());
});

const systemController = {
  ping,
};

export default systemController;
