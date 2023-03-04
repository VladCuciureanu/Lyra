import { createServer } from './server';
// import pkg from '../package.json';
import logger from './logger';
import env from './env';

export async function startServer(): Promise<void> {
  logger.info('🥱 Booting up Lyra...');
  const server = await createServer();

  const host = env.HOST;
  const port = env.PORT;

  server
    .listen(port, host, () => {
      // TODO: Check for update
      logger.info(`🎉 Server started at http://${host}:${port}`);
    })
    .once('error', (err: any) => {
      if (err?.code === 'EADDRINUSE') {
        logger.error(`🤯 Port ${port} is already in use`);
        process.exit(1);
      } else {
        throw err;
      }
    });
}

startServer();
