import GlobalLogger from "@/utils/logger";
import { Request, Response } from "express";
import UserService from "./service";
import config from "@/config";

class UserController {
  // constructor(parameters) {

  // }

  async update(req: Request, res: Response) {
    const imageUrl = config.server.hosturl + '/images/' + req.file?.filename;
    const user = await UserService.update({...req.body, imageUrl}, req);
    res.json({message: "User updated successfully"});
  }
}

export default new UserController();
