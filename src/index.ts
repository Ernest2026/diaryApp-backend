import express from 'express'
import config from '@/config'
import logger from '@/utils/logger'
import { prisma } from './services/database.service'

const app = express()

process.on("beforeExit", async () => {
  await prisma.$disconnect()
})

export function run() {
  app.listen(config.server.port, () => {
    logger.info(`Server running on port ${config.server.port}`)
  })
}

export default app
