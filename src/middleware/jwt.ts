// import { prisma } from "@/utils/database_"
import TokenService from "@/utils/token";
import { APIError } from "@/utils/error";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import UserService from "@/modules/user/service";
import { IUserDb } from "@/types/dbmodel";
import GlobalLogger from "@/utils/logger";

// export function verify(func: (req: Request, res: Response, next: NextFunction, user: IUserDb) => Promise<void>) {
export async function verify(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new APIError("No token found", { code: StatusCodes.UNAUTHORIZED });
  }

  const [, suppliedAccessToken] = authHeader.split(" ");
  if (!suppliedAccessToken) {
    throw new APIError("No token found", { code: StatusCodes.UNAUTHORIZED });
  }

  const verifiedAccessToken =
    TokenService.verifyAccessToken(suppliedAccessToken);
  if (!verifiedAccessToken) {
    throw new APIError("Invalid token", { code: StatusCodes.UNAUTHORIZED });
  }

  const user = await UserService.findByEmail(verifiedAccessToken.email);

  if (!user)
    throw new APIError(ReasonPhrases.UNAUTHORIZED, {
      code: StatusCodes.UNAUTHORIZED,
    });

  req.userEmail = verifiedAccessToken.email;
  next();
}
// }
