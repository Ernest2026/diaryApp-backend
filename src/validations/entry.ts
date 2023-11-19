import { APIError } from "@/utils/error";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

class AuthValidations {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  async validateEntry(payload: object): Promise<boolean> {
    const schema = z
      .object({
        title: z.string(),
        emoji: z.string().emoji(),
        text: z.string(),
      })
      .parse(payload);
    if (!schema)
      throw new APIError("Invalid input", { code: StatusCodes.BAD_REQUEST });
    return true;
  }

  async validateEntryPagination(payload: object): Promise<boolean> {
    const schema = z
      .object({
        limit: z.number().min(10).default(10),
        page: z.number().min(1).default(1),
      })
      .parse(payload);
    if (!schema)
      throw new APIError("Invalid input", { code: StatusCodes.BAD_REQUEST });
    return true;
  }
}

export default new AuthValidations();
