import { Router } from "express";
import AuthRouter from "./auth.router";

const AppRouter = Router()

AppRouter.use("/auth", AuthRouter)

export default AppRouter
