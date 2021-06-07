import { Response } from "express";
import { FailedRequest } from "../framework/types";
import errorMap from "./errorMap";

const getStatusFromError = (error: Error): number =>
  errorMap.get(error.constructor.name) ??
  errorMap.get(Object.getPrototypeOf(error.constructor).name) ??
  500;

const handleError = (
  error: Error,
  request: FailedRequest,
  response: Response & { statusCode: number }
): void => {
  request.error = error;
  response.statusCode = getStatusFromError(error);
  response.json({ message: error.message });
};

export default handleError;
