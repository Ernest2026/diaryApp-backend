import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import AuthController from "./controller";

const authRouter = Router();
const { signup } = AuthController;
const { inspectSignup } = AuthMiddleware;

authRouter.post("/signup", inspectSignup, signup);

export default authRouter;
