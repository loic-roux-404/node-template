import { NextFunction, Response, Request } from "express";
import { Middleware } from "@decorators/express";
import AuthenticationError from "../errors/AuthenticationError";
import MissingTokenError from "../errors/MissingTokenError";
import { Injectable, Container } from "@decorators/di";
import { Client } from "openid-client";

@Injectable()
export class TokenProtectedMiddleware implements Middleware {
  public async use(
    request: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    const authorization = request.get("authorization");
    if (authorization == null) {
      next(new MissingTokenError());
      return;
    }

    const token = authorization.split("Bearer")[1].trim() ?? null;
    if (
      token == null &&
      !(await Container.get<Client>("auth").introspect(token)).active
    ) {
      next(new AuthenticationError());
    }

    next();
  }
}
