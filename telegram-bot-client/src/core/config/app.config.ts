import * as dotenv from 'dotenv';
dotenv.config();

export default {
   TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ?? '',
   SESSION_TTL_SECONDS:
      typeof process.env.SESSION_TTL_SECONDS === 'undefined'
         ? 604800
         : parseInt(process.env.SESSION_TTL_SECONDS),
   REDIS_SERVER_HOST: process.env.REDIS_SERVER_HOST ?? '127.0.0.1',
   REDIS_SERVER_PORT:
      typeof process.env.REDIS_SERVER_PORT === 'undefined'
         ? 6379
         : parseInt(process.env.REDIS_SERVER_PORT),
   REDIS_SERVER_DB:
      typeof process.env.REDIS_SERVER_DB === 'undefined'
         ? 1
         : parseInt(process.env.REDIS_SERVER_DB),
};
