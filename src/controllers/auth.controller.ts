import { APIError } from '@/utils/error'
import { Request, Response } from 'express'
import StatusCodes from "http-status-codes"

function login(req: Request, res: Response) {
  throw new APIError("Not implemented yet!", { code: StatusCodes.INTERNAL_SERVER_ERROR })
}

function getProfile(req: Request, res: Response) {
  throw new APIError("Not implemented yet!", { code: StatusCodes.INTERNAL_SERVER_ERROR })
}

const AuthController = {
  login,
  getProfile
}

export default AuthController
