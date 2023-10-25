import jwt from "jsonwebtoken";
import _ from "lodash";
import { Request, Response, NextFunction } from "express";

import Tools from "../utils";
import { UserService } from "../services";
import APIValidations from "../validations";

const { errorResponse } = Tools;

class Test {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  async authorize(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader =
        <string>req.headers.authorization || <string>req.headers.Authorization;

      let token, decoded;
      if (authHeader) {
        (token = authHeader.split(" ")[1]),
          (decoded = jwt.verify(token, process.env.SESSION_SECRET as string));
      }
      if (token) {
        req.user = decoded;
        const { email } = decoded;
        const user = await UserService.find({ email });
        const selected = _.pick(user, [
          "_id",
          "firstName",
          "lastName",
          "email",
        ]);
        req.user = selected;
        next();
      } else {
        return errorResponse(res, "Not Authenticated!", 401, ":-(");
      }
    } catch (error: any) {
      return errorResponse(res, "Not Authenticated!", 401, ":-(");
    }
  }
}

export default Test;
