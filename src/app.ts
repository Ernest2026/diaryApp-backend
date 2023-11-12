import "express-async-errors";

import config from "@/config";
import logger from "@/utils/logger";
import cors from "cors";
import express, { Express } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import morgan from "morgan";
import ErrorHandlerMiddleware from "./middleware/error-handler";
import LoggerMiddleware from "./middleware/logger";
import AppRouter from "./modules";
import DBConnection from "./utils/database";

export function bootstrap() {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.options("*", cors());
  app.use(morgan("combined"));

  app.use(LoggerMiddleware);

  app.get("/", (_, res) => res.send("Do you like indomie?"));

  app.use("/api/v1/", AppRouter);

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  });
  app.use(ErrorHandlerMiddleware);

  return app;
}

export async function run(app: Express) {
  await DBConnection.mongoConnect();

  app.listen(config.server.port, () => {
    logger.info(`Server running on port ${config.server.port}`);
  });
}

export default bootstrap();
