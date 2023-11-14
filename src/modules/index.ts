import { Router } from "express";
import { AuthRouter } from "./auth";
import { UserRouter } from "./user";

const AppRouter = Router()

AppRouter.use("/auth", AuthRouter)
AppRouter.use("/", UserRouter)

export default AppRouter
