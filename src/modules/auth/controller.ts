import { APIError } from "@/utils/error";
import { getDecryptedPassword, getEncryptedPassword } from "@/utils/pwdHash";
import TokenService from "@/utils/token";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../user/service";

class Auth {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  async signup(req: Request, res: Response) {
    try {
      const { fullname, email, password } = req.body;
      const userExist = await UserService.findByEmail(email);
      if (userExist) {
        throw new APIError("Email already exist", {
          code: StatusCodes.EXPECTATION_FAILED,
        });
      }
      const data = await UserService.create({
        fullname,
        email,
        password: await getEncryptedPassword(password),
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
    } catch (error: any) {
      throw new APIError(error.message || "Failed to signup", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await UserService.findByEmail(email);
      if (!data || !data.password) {
        throw new APIError("Email doesn't exist", {
          code: StatusCodes.EXPECTATION_FAILED,
        });
      }
      const checkPwd = await getDecryptedPassword(password, data.password);
      if (!checkPwd) {
        throw new APIError("Wrong password", {
          code: StatusCodes.EXPECTATION_FAILED,
        });
      }
      const accessToken = await TokenService.generateAccessToken(email);
      const refreshToken = await TokenService.generateRefreshToken(email);
      res.status(StatusCodes.CREATED).json({
        message: "Login successfully",
        data,
        token: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      throw new APIError(error.message || "Failed to login", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default new Auth();
