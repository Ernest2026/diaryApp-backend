import { Router } from "express";

import testRouter from "./user/user.router";

const api = Router();

api.use("/user", testRouter);

export default api;
