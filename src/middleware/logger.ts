import { NextFunction, Request, Response } from "express"
import AppLogger from "@/utils/logger"

const logger = AppLogger.getSubLogger({ name: "LoggerMiddleware" })

export default function LoggerMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.locals.logger = logger
	next()
}
