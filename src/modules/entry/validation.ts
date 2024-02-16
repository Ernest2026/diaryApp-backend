import { APIError } from "@/utils/error";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

class EntryValidations {
  // args: (string | undefined)[];
  // constructor(...args: (string | undefined)[]) {
  //   this.args = args;
  // }

  async validateCreateEntry(payload: object): Promise<boolean> {
    const schema = z
      .object({
        title: z.string({ required_error: "Please supply a title" }),
        emoji: z
          .string({ required_error: "Please supply an emoji" })
          .emoji("Invalid emoji"),
        text: z.string({ required_error: "Please supply some text" }),
      })
      .parse(payload);
    if (!schema)
      throw new APIError("Invalid input", { code: StatusCodes.BAD_REQUEST });
    return true;
  }

  async validateGetEntry(payload: object): Promise<boolean> {
    const schema = z
      .object({
        limit: z.string().default("10"),
        page: z.string().default("1"),
      })
      .parse(payload);
    if (!schema)
      throw new APIError("Invalid query input", { code: StatusCodes.BAD_REQUEST });
    return true;
  }
  
  async validatePutEntryById(payload: object): Promise<boolean> {
    const schema = z.object({
      title: z.string(),
      emoji: z.string().emoji(),
      text: z.string()
    }).partial().parse(payload);
    if (!schema)
      throw new APIError("Invalid query input", { code: StatusCodes.BAD_REQUEST });
    return true;
  }
}

export default new EntryValidations();
