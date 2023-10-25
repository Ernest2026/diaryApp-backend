import { connection, connect, disconnect } from "mongoose";
import env from "../configs/env";

const MONGO_URL = env.MONGO_URL as string;

connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await connect(MONGO_URL);
}

async function mongoDisconnect() {
  await disconnect();
}

const DBConnection = {
  mongoConnect,
  mongoDisconnect,
};

export default DBConnection;
