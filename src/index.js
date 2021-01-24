import http from 'http';

import { app } from './app.js';
import config from './config.js';

const { port } = config.app;

http.createServer(app).listen(port, () => console.log(`Listening on ${port} port...`));
