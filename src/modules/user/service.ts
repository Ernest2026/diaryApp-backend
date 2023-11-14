import { UserType } from "@/types/dbmodel";
import { APIError } from "@/utils/error";
import { StatusCodes } from "http-status-codes";
import UserModel from "../auth/model";
import GlobalLogger from "@/utils/logger";
import { Request } from "express";

class UserService {
  // constructor(parameters) {

  // }

  async create(payload: UserType) {
    try {
      const user = await UserModel.create(payload);
      // GlobalLogger.debug(payload)
      return user;
    } catch (error: any) {
      throw new APIError("Error from auth service", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async find(email: string) {
    try {
      if (!email) {
        const profile: UserType | null = await UserModel.find();
        return profile;
        // throw new APIError('Enter email to find', {code: StatusCodes.INTERNAL_SERVER_ERROR})
      }
      const profile = await UserModel.findOne({ email });
      return profile;
    } catch (error: any) {
      throw new APIError("error from auth service", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update({ fullname, imageUrl }: UserType, req: any) {
    try {
      const user = await UserModel.updateOne(
        { email: req.userEmail },
        { fullname, imageUrl }
      );
      return user;
    } catch (error: any) {
      throw new APIError("Error from user service", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default new UserService();
