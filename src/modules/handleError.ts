import { Response } from "express";
import { FailedRequest } from "../types/Server";

export default (
  error: Error,
  request: FailedRequest,
  response: Response,
  status = 500
): void => {
  if (process.env.NODE_ENV !== "production")
    console.error(error.constructor, error);
  request.error = error;
  response.statusCode = status;
  response.json({ message: error.message });
};
