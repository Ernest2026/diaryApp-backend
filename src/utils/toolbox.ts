import { Request, Response } from "express";

/**
 * Function for api tools methods
 * @function Toolbox
 */
class Tools {
  args: any[];
  constructor(...args: undefined[]) {
    this.args = args;
  }

  /**
   *
   * API success response
   * @param {*} res - response.
   * @param {*} responseMessage - api message.
   * @param {*} data - api data.
   * @param {*} code - response code.
   * @returns {object} - api response object
   * @memberof Toolbox
   */
  successResponse(
    res: Response,
    responseMessage: string,
    data: any,
    code = 200
  ) {
    return res.status(code).json({
      status: "success",
      responseCode: "00",
      responseMessage,
      details: data,
    });
  }

  /**
   * API error response
   * @param {*} res - response.
   * @param {*} responseMessage - api message
   * @param {*} code - response code.
   * @param {*} error - api data.
   * @returns {object} - api response object
   * @memberof Toolbox
   */
  errorResponse(
    res: Response,
    responseMessage = "Some error occurred while processing request.",
    code = 500,
    error: string
  ) {
    return res.status(code).json({
      status: "fail",
      responseCode: "01",
      responseMessage,
      error,
    });
  }
}

export default Tools;
