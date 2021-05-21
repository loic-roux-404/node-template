import { Error as MongooseError } from "mongoose";
import { MongoError } from "mongodb";
import AuthenticationError from "../oauth/errors/AuthenticationError";

const errorMap: Map<string, number> = new Map<string, number>();

errorMap.set(MongooseError.name, 500);
errorMap.set(MongoError.name, 500);
errorMap.set("BulkWriteError", 409);
errorMap.set(MongooseError.DocumentNotFoundError.name, 404);
errorMap.set(MongooseError.ValidationError.name, 400);
errorMap.set("CastError", 400);
errorMap.set(AuthenticationError.name, 403);

export default errorMap;
