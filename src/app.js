import Express from 'express';

import { newsRoutes } from './routes/news.routes.js';
import * as helpers from './helpers.js';

helpers.createTempDirectoryIfNotExists();

export const app = Express();

app
  .use('/news', newsRoutes)
  .use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({
      message: 'Internal error',
    });
  });
