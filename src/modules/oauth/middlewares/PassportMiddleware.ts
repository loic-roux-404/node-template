import { NextFunction, Response, Request } from "express";
import { Middleware } from "@decorators/express";
import AuthenticationError from "../errors/AuthenticationError";
import MissingTokenError from "../errors/MissingTokenError";

export class PassportMiddleware implements Middleware {
  public async use(
    request: Request & { isAuthenticated: () => boolean },
    response: Response,
    next: NextFunction
  ): Promise<void> {
    if (request.isAuthenticated()) {
      next();
    } else if (request.get("authorization") == null) {
      next(new MissingTokenError());
    } else {
      next(new AuthenticationError());
    }
  }
}
