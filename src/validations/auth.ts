import { APIError } from "@/utils/error";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

class AuthValidations {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  async validateSignup(payload: object): Promise<boolean> {
    const schema = z
      .object({
        fullname: z.string(),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string(),
      })
      .parse(payload);
    if (!schema)
      throw new APIError("Invalid input", { code: StatusCodes.BAD_REQUEST });
    return true;
  }
}

export default new AuthValidations();
