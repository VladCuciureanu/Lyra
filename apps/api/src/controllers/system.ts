import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

const ping: RequestHandler = asyncHandler(async (req, res, next) => {
  res.send('🏓 Pong!');
});

const systemController = {
  ping,
};

export default systemController;
