import config from '../config';
import { connect, connection, disconnect } from 'mongoose';

connection.once('open', () => {
  console.log('MongoDB connection ready');  
  // throw new APIError('MongoDB connection ready!', {code: StatusCodes.ACCEPTED});
});

connection.on('error', (err) => {
  console.error(err);
  // throw new APIError(err.message, {code: StatusCodes.INTERNAL_SERVER_ERROR})
});

async function mongoConnect() {
  await connect(config.server.database_url);
}

async function mongoDisconnect() {
  await disconnect();
}

const DBConnection = {
  mongoConnect,
  mongoDisconnect,
};

export default DBConnection;
