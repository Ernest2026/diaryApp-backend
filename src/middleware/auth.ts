import { APIError } from "@/utils/error";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import AuthValidations from "../validations/auth";

class Auth {
    args: (string | undefined)[];
    constructor(...args: (string | undefined)[]) {
        this.args = args;
    }

    async inspectSignup(req: Request, res: Response, next: NextFunction) {
        try {
            await AuthValidations.validateSignup(req.body);
            next();
        } catch (error: any) {
            throw new APIError("Input not validated", {code: StatusCodes.BAD_REQUEST})
        }
    }
    
    async inspectLogin(req: Request, res: Response, next: NextFunction) {
        try {
            await AuthValidations.validateLogin(req.body);
            next();
        } catch (error: any) {
            throw new APIError("Input not validated", {code: StatusCodes.BAD_REQUEST})
        }
    }
}

export default new Auth()