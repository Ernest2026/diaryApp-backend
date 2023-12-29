import { Router } from "express";
import { EntriesRouter } from "./entry";
import { AuthRouter } from "./auth";

const AppRouter = Router()

AppRouter.use("/entries", EntriesRouter)
AppRouter.use("/auth", AuthRouter)

export default AppRouter
