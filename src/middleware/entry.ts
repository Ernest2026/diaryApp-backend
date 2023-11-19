import { APIError } from "@/utils/error";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import EntryValidations from "../validations/entry";

class Auth {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  async inspectEntry(req: any, res: any, next: any) {
    try {
      await EntryValidations.validateEntry(req.body);
      next();
    } catch (error: any) {
      throw new APIError("Entry input not validated", {
        code: StatusCodes.BAD_REQUEST,
      });
    }
  }
  
  async inspectEntryPagination(req: any, res: any, next: any) {
    try {
      await EntryValidations.validateEntryPagination(req.body);
      next();
    } catch (error: any) {
      throw new APIError("Entry input not validated", {
        code: StatusCodes.BAD_REQUEST,
      });
    }
  }
}

export default new Auth();
