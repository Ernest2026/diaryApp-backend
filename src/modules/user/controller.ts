import GlobalLogger from "@/utils/logger";
import { Request, Response } from "express";
import UserService from "./service";
import config from "@/config";
import { APIError } from "@/utils/error";
import { StatusCodes } from "http-status-codes";
import fs from 'fs'
import path from 'path'

class UserController {
  // constructor(parameters) {

  // }

  async update(req: Request, res: Response) {
    const imageUrl = config.server.hosturl + '/images/' + req.file?.filename;
    const user = await UserService.updateUser({...req.body, imageUrl}, res.locals.user.email);

    if (config.server.node_env == "test")
      fs.unlink(path.resolve(__dirname, `../../../uploads/${req.file?.filename}`), (err) => {
        if (err) throw new APIError("Error deleting image on test env", {code: StatusCodes.INTERNAL_SERVER_ERROR});
      });
    
    if (!user.modifiedCount) {
        throw new APIError("Update user failed", {code: StatusCodes.INTERNAL_SERVER_ERROR})
    }
    res.status(StatusCodes.CREATED).json({message: "User updated successfully"});
  }
}

export default new UserController();
