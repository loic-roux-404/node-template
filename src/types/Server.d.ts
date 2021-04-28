import { Request } from "express";

export interface FailedRequest extends Request {
  error: Error;
}
