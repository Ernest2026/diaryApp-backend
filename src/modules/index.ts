import { Router } from "express";
import { AuthRouter } from "./auth";
import { EntriesRouter } from "./entry";
import { UserRouter } from "./user";

const AppRouter = Router()

AppRouter.use("/auth", AuthRouter)
AppRouter.use("/", UserRouter)
AppRouter.use("/entry", EntriesRouter)

export default AppRouter
