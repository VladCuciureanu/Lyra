import { RequestHandler } from 'express';
import { RouteNotFoundException } from '../exceptions/route-not-found';

export const routeNotFound: RequestHandler = async (req, res, next) =>
  next(new RouteNotFoundException(req.path));
