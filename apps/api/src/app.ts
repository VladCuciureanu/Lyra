import express, { Application, json } from 'express';
import env from './env';
import cors from './middlewares/cors';
import { routeNotFound } from './middlewares/route-not-found';
import albumsRouter from './routes/albums';
import artistsRouter from './routes/artists';
import authRouter from './routes/auth';
import playlistsRouter from './routes/playlists';
import tracksRouter from './routes/tracks';
import usersRouter from './routes/users';

export default async function createApp(): Promise<Application> {
  // TODO: Validate env

  const version = 1;
  const basePath = `/api/v${version}`;

  const app = express();
  app.use(json());

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Powered-By', 'Lyra');
    next();
  });

  if (env.CORS_ENABLED === true) {
    app.use(cors);
  }

  app.use(`${basePath}/auth`, authRouter);
  app.use(`${basePath}/users`, usersRouter);
  app.use(`${basePath}/albums`, albumsRouter);
  app.use(`${basePath}/artists`, artistsRouter);
  app.use(`${basePath}/tracks`, tracksRouter);
  app.use(`${basePath}/playlists`, playlistsRouter);

  app.get('/robots.txt', (_, res) => {
    res.set('Content-Type', 'text/plain');
    res.status(200);
    res.send(env.ROBOTS_TXT);
  });

  app.use(routeNotFound);

  // TODO: app.use(errorHandler)

  return app;
}
