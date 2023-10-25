import AuthController from "@/controllers/auth.controller";
import { Router } from "express";

const AuthRouter = Router()

AuthRouter.post("/login", AuthController.login)

export default AuthRouter
