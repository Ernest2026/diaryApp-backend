import { APIError } from "@/utils/error";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import EntryValidation from "./validation";


class Entry {
  // constructor(parameters) {

  // }

  async inspectCreateEntry(req: Request, res: Response, next: NextFunction) {
    try {
      await EntryValidation.validateCreateEntry(req.body);
      next();
    } catch (error: any) {
      throw new APIError("Input not validated", {
        code: StatusCodes.BAD_REQUEST,
      });
    }
  }
  
  async inspectGetEntry(req: Request, res: Response, next: NextFunction) {
    try {
      await EntryValidation.validateGetEntry(req.query);
      next();
    } catch (error: any) {
      throw new APIError("Input not validated", {
        code: StatusCodes.BAD_REQUEST,
      });
    }
  }
 
  async inspectPutEntryById(req: Request, res: Response, next: NextFunction) {
    try {
      await EntryValidation.validatePutEntryById(req.query);
      next();
    } catch (error: any) {
      throw new APIError("Input not validated", {
        code: StatusCodes.BAD_REQUEST,
      });
    }
  }
}

export default new Entry();
