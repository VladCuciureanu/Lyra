import express, { Application } from 'express';
import { parse as parseQuery } from 'qs';

export default async function createApp(): Promise<Application> {
  const app = express();

  app.set('query parser', (str: string) => parseQuery(str, { depth: 10 }));

  // TODO: app use logger

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Powered-By', 'Lyra');
    next();
  });

  app.get('/server/ping', (req, res) => res.send('🏓 Pong!'));

  return app;
}
