import { Router } from "express";

import { TestMiddleware } from "../../middlewares";
import Test from "../../controllers/test/test.controller";

const { httpGetSomething } = new Test();

const testRouter = Router();

testRouter.get("/", TestMiddleware.inspectSomething, httpGetSomething);

export default testRouter;
