import { APIError } from "@/utils/error"
import AppLogger from "@/utils/logger"
import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { z, ZodError } from "zod"

const logger = AppLogger.getSubLogger({ name: "ErrorHandlerMiddleware" })

export default async function ErrorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: err.errors.map((err) => ({
        message: err.message,
        path: err.path
      }))
    })
  } else if (err instanceof APIError) {
    logger.error(err.stack)
    res.status(err.code).json({ error: err.message })
  } else {
    logger.error("An error occurred:", err.stack)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}
