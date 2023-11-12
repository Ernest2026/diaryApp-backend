import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import AuthController from "./controller";

const authRouter = Router();
const { signup, login } = AuthController;
const { inspectSignup, inspectLogin } = AuthMiddleware;

authRouter.post("/signup", inspectSignup, signup);
authRouter.post("/login", inspectLogin, login);

export default authRouter;
