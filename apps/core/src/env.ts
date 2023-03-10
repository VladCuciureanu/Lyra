import { config as loadEnv } from 'dotenv';
import defaultEnv from './constants/default-env';
import logger from './logger';

let env: Record<string, any> = {};
_refreshEnv();

function _refreshEnv() {
  loadEnv();
  process.env.PORT = process.env.CORE_PORT;
  env = {
    ...defaultEnv,
    ...process.env,
  };
  process.env = env;
}

export function refreshEnv(): void {
  logger.debug('♻️ Loading environment variables...');
  _refreshEnv();
  logger.debug('🎊 Finished loading environment variables!');
}

export default env;
