import dotenv from 'dotenv';

dotenv.config();

export default {
  app: {
    port: process.env.PORT || 3000
  },
  newsapi: {
    key: process.env.NEWSAPI_KEY
  }
};