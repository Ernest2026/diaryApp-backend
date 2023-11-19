import { EntryType } from "@/types/dbmodel";
import { APIError } from "@/utils/error";
import { StatusCodes } from "http-status-codes";
import EntryModel from "./model";
import GlobalLogger from "@/utils/logger";
import { Request } from "express";

class EntryService {
  // constructor(parameters) {

  // }

  async create(payload: EntryType) {
    try {
      const user = await EntryModel.create(payload);
      return user;
    } catch (error: any) {
      throw new APIError("Error from entry service", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async find(query: any) {
    try {
      const entry = await EntryModel.find(query);
      return entry;
    } catch (error: any) {
      throw new APIError("error from entry service", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
  
  async findById(id: string) {
    try {
      const entry = await EntryModel.findById(id);
      return entry;
    } catch (error: any) {
      throw new APIError("error from entry service", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(payload: any, req: any) {
    try {
      const user = await EntryModel.updateOne(payload);
      return user;
    } catch (error: any) {
      throw new APIError("Error from user service", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
  
  async delete(payload: any) {
    try {
      const entry = await EntryModel.deleteOne(payload);
      return entry;
    } catch (error: any) {
      throw new APIError("Error from entry service", {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default new EntryService();
