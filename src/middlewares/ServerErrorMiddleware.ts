import { ErrorMiddleware, ERROR_MIDDLEWARE } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ServerErrorMiddleware implements ErrorMiddleware {
  public use(error: Error, request: Request, response: Response, next: NextFunction) {
    console.error(error.message, error.stack)
    response.json({ error: error.message })
    next();
  }
}

/**
 * @exports {Provider}
 */
export default { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware }
