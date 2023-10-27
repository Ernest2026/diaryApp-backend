import "express-async-errors"

import express from 'express'
import config from './config/index'
import logger from './utils/logger'
// import ErrorHandlerMiddleware from "./middleware/error-handler.middleware"
// import LoggerMiddleware from "./middleware/logger.middleware"
import { prisma } from './services/database.service'
import AppRouter from './routers'
import morgan from 'morgan'
import cors from 'cors'
import { ReasonPhrases, StatusCodes } from "http-status-codes"

const app = express()

process.on("beforeExit", async () => {
  await prisma.$disconnect()
})

// export function bootstrap() {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.options("*", cors())
  app.use(morgan('combined'))

  // app.use(LoggerMiddleware)

  app.get("/", (_, res) => res.send("Do you like indomie?"));

  app.use('/api/v1/', AppRouter)

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND })
  })
  // app.use(ErrorHandlerMiddleware)
// }

// export function run() {
  // app.listen(config.server.port, () => {
  //   logger.info(`Server running on port ${config.server.port}`)
  // })
// }

export default app
