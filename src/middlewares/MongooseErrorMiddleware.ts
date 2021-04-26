import { Error as MongooseError } from 'mongoose'
import { ErrorMiddleware, ERROR_MIDDLEWARE } from '@decorators/express';
import { Injectable } from '@decorators/di';
import handleError from '../modules/handleError';
import { NextFunction, Response } from 'express';
import { FailedRequest } from '../types/Server'

@Injectable()
export class MongooseErrorMiddleware implements ErrorMiddleware {
  public use(error: MongooseError, request: FailedRequest, response: Response, next: NextFunction) {
    handleError(error, request, response, 400)
    next()
  }
}

export default { provide: ERROR_MIDDLEWARE, useClass: MongooseErrorMiddleware }
