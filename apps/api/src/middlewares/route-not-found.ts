import { RequestHandler } from 'express';
import { RouteNotFoundException } from '../exceptions/route-not-found';

export const undefinedRouteHandler: RequestHandler = async (req, res, next) =>
  next(new RouteNotFoundException(req.path));
