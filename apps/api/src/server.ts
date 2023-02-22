import {
  Server,
  createServer as createHTTPServer,
  IncomingMessage,
  ServerResponse,
} from 'http';
import { createTerminus, TerminusOptions } from '@godaddy/terminus';
import { Request } from 'express';
import { hrtime } from 'process';
import { once } from 'lodash';
import createApp from './app';
import Environment from './constants/environments';
import logger from './logger';
import env from './env';

export async function createServer(): Promise<Server> {
  const server = createHTTPServer(await createApp());

  server.on(
    'request',
    function (req: IncomingMessage & Request, res: ServerResponse) {
      const startTime = hrtime();

      const complete = once(function (finished: boolean) {
        (req.socket as any)._metrics = {
          in: req.socket.bytesRead,
          out: req.socket.bytesWritten,
        };
      });

      res.once('finish', complete.bind(null, true));
      res.once('close', complete.bind(null, false));
    }
  );

  createTerminus(server, terminusOptions);

  return server;
}

async function beforeShutdown() {
  if (env.NODE_ENV !== Environment.Dev) {
    logger.info('⏳ Shutting down...');
  }
}

async function onSignal() {
  // const database = getDatabase();
  // await database.destroy();

  logger.info('💥 Database connections destroyed');
}

async function onShutdown() {
  if (env.NODE_ENV !== Environment.Dev) {
    logger.info('💤 Lyra shut down OK. Bye bye!');
  }
}

const terminusOptions: TerminusOptions = {
  timeout: 1000,
  signals: ['SIGINT', 'SIGTERM', 'SIGHUP'],
  beforeShutdown,
  onSignal,
  onShutdown,
};
