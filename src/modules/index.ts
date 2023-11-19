import { Router } from "express";
import { AuthRouter } from "./auth";
import { UserRouter } from "./user";
import { EntryRouter } from "./entries";
import { verify } from "@/middleware/jwt";

const AppRouter = Router()

AppRouter.use("/auth", AuthRouter)
AppRouter.use("/", verify, UserRouter)
AppRouter.use("/entry", verify, EntryRouter)

export default AppRouter
