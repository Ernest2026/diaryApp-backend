import { ILogObj, Logger } from "tslog"

declare global {
  namespace Express {
    interface Locals {
      logger: Logger<ILogObj>
    }
  }
}
