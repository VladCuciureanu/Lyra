import express, { Application, json } from 'express';
import authRouter from './controllers/auth';
import usersRouter from './controllers/users';

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

  return app;
}
