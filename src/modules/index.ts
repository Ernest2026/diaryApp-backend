import { Router } from "express";
import { EntriesRouter } from "./entries";

const AppRouter = Router()

AppRouter.use("/entries", EntriesRouter)

export default AppRouter
