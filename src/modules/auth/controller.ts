import { prisma } from "@/utils/database_";
import { APIError } from "@/utils/error";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppLogger from "@/utils/logger";
import UserService from "./service";
import TokenService from "@/utils/token";

class Auth {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  async signup(req: Request, res: Response) {
    try {
      const { fullname, email, password } = req.body;
      const userExist = await UserService.find(email);
      if (userExist) {
        throw new APIError("Email already exist", {
          code: StatusCodes.EXPECTATION_FAILED,
        });
      }
      const data = await UserService.create({
        fullname,
        email,
        password,
        updatedAt: new Date(),
      });
      const accessToken = await TokenService.generateAccessToken(email);
      const refreshToken = await TokenService.generateRefreshToken(email);
      res.status(StatusCodes.CREATED).json({
        message: "User created successfully",
        data,
        token: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      throw new APIError(error.message || "Failed to signup", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default new Auth();
