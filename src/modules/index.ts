import { Router } from "express";
import { EntriesRouter } from "./entries";
import { AuthRouter } from "./auth";

const AppRouter = Router()

AppRouter.use("/entries", EntriesRouter)
AppRouter.use("/auth", AuthRouter)

export default AppRouter
