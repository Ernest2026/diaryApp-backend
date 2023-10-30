import { prisma } from "@/utils/database"
import TokenService from "@/services/token"
import { APIError } from "@/utils/error"
import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { User } from '@prisma/client'

export function verify(func: (req: Request, res: Response, next: NextFunction, user: User) => Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new APIError("Invalid token", { code: StatusCodes.UNAUTHORIZED })
    }

    const [, suppliedAccessToken] = authHeader.split(" ")
    if (!suppliedAccessToken) {
      throw new APIError("Invalid token", { code: StatusCodes.UNAUTHORIZED })
    }

    const verifiedAccessToken =
      TokenService.verifyAccessToken(suppliedAccessToken)
    if (!verifiedAccessToken) {
      throw new APIError("Invalid token", { code: StatusCodes.UNAUTHORIZED })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: verifiedAccessToken.email
      }
    })

    if (!user)
      throw new APIError(ReasonPhrases.UNAUTHORIZED, { code: StatusCodes.UNAUTHORIZED })

    await func(req, res, next, user)
  }
}
