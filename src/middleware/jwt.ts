import UserService from "@/modules/user/service"
import { APIError } from "@/utils/error"
import TokenService from "@/utils/token"
import { NextFunction, Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

export async function verify(req: Request, res: Response, next: NextFunction) {
  // return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new APIError("No token found", { code: StatusCodes.UNAUTHORIZED })
    }

    const [, suppliedAccessToken] = authHeader.split(" ")
    if (!suppliedAccessToken) {
      throw new APIError("No token found", { code: StatusCodes.UNAUTHORIZED })
    }

    const verifiedAccessToken =
      TokenService.verifyAccessToken(suppliedAccessToken)
    if (!verifiedAccessToken) {
      throw new APIError("Invalid token", { code: StatusCodes.UNAUTHORIZED })
    }

    const user = await UserService.find(verifiedAccessToken.email)

    if (!user)
      throw new APIError(ReasonPhrases.UNAUTHORIZED, { code: StatusCodes.UNAUTHORIZED })

    req.userEmail = verifiedAccessToken.email;
    next();
  }
// }
