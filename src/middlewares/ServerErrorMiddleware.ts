import { ErrorMiddleware, ERROR_MIDDLEWARE } from "@decorators/express";
import { Injectable } from "@decorators/di";
import { NextFunction, Response } from "express";
import { FailedRequest } from "../types/Server";
import handleError from "../modules/handleError";

@Injectable()
export class ServerErrorMiddleware implements ErrorMiddleware {
  public use(
    error: Error,
    request: FailedRequest,
    response: Response,
    next: NextFunction
  ): void {
    handleError(error, request, response, 500);
    next();
  }
}

export default { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware };
