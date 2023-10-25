import { Request, Response } from 'express'
import StatusCodes from "http-status-codes"

function login(req: Request, res: Response) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Not implemented yet!" })
}

const AuthController = {
  login
}

export default AuthController
