import { createServer } from 'http';
import config from './config/index'

import app from './app';

const PORT = config.server.port || 8000;

const server = createServer(app);

async function startServer() {
//   await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
