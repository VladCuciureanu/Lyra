import express, { Application, json } from 'express';
import { RouteNotFoundException } from './exceptions/route-not-found';
import { undefinedRouteHandler } from './middlewares/route-not-found';
import authRouter from './routes/auth';
import usersRouter from './routes/users';

export default async function createApp(): Promise<Application> {
  const version = 1;
  const basePath = `/api/v${version}`;

  const app = express();
  app.use(json());

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Powered-By', 'Lyra');
    next();
  });

  app.use(`${basePath}/auth`, authRouter);
  app.use(`${basePath}/users`, usersRouter);

  app.get('/server/ping', (_req, res) => res.send('🏓 Pong!'));

  // TODO: app use logger

  app.use(undefinedRouteHandler);

  return app;
}
