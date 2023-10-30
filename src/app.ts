import "express-async-errors"

import express, { Express } from 'express'
import config from '@/config'
import logger from '@/utils/logger'
import ErrorHandlerMiddleware from "./middleware/error-handler"
import LoggerMiddleware from "./middleware/logger"
import { prisma } from './utils/database'
import AppRouter from './modules'
import morgan from 'morgan'
import cors from 'cors'
import { ReasonPhrases, StatusCodes } from "http-status-codes"


process.on("beforeExit", async () => {
  await prisma.$disconnect()
})

export function bootstrap() {
  const app = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.options("*", cors())
  app.use(morgan('combined'))

  app.use(LoggerMiddleware)

  app.use('/api/v1/', AppRouter)

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND })
  })
  app.use(ErrorHandlerMiddleware)

  return app
}

export function run(app: Express) {
  app.listen(config.server.port, () => {
    logger.info(`Server running on port ${config.server.port}`)
  })
}

export default bootstrap()
