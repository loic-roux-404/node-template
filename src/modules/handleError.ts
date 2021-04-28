import { Response } from "express";
import { FailedRequest } from "../types/Server";
import { Error as MongooseError } from "mongoose";
import { MongoError } from "mongodb";

const ERROR_MAP: Map<string, number> = new Map<string, number>();

ERROR_MAP.set(Error.name, 500);
ERROR_MAP.set(MongooseError.name, 500);
ERROR_MAP.set(MongoError.name, 500);
ERROR_MAP.set("BulkWriteError", 409);
ERROR_MAP.set(MongooseError.DocumentNotFoundError.name, 404);
ERROR_MAP.set(MongooseError.ValidationError.name, 400);

const getStatusFromError = (error: Error): number =>
  ERROR_MAP.get(error.name) ??
  ERROR_MAP.get(error.constructor.prototype) ??
  500;

export default (
  error: Error,
  request: FailedRequest,
  response: Response & { statusCode: number }
): void => {
  request.error = error;
  response.statusCode = getStatusFromError(error);
  response.json({ message: error.message });
};
