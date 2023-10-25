import AuthController from "@/controllers/auth.controller";
import { Router } from "express";

const AuthRouter = Router()

AuthRouter.get("/profile", AuthController.getProfile)
AuthRouter.post("/login", AuthController.login)

export default AuthRouter
