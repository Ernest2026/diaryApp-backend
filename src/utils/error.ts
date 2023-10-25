import { StatusCodes } from "http-status-codes"

export class APIError extends Error {
	public declare code: StatusCodes
	public declare cause?: Error

	constructor(
		error: string,
		{ code, cause }: { cause?: Error; code: StatusCodes }
	) {
		super(error)
		this.name = "APIError"
		this.code = code
		this.cause = cause
	}
}
