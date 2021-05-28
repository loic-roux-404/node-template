/* eslint-disable @typescript-eslint/method-signature-style */
import { Document, FilterQuery } from "mongoose";
import { Response as ExpressResponse } from "express";

/**
 * Crud rules
 */
export default interface CRLUD {
  /**
   * @example @Put("/") read() {}
   */
  create(body: Document | Document[], res: ExpressResponse): Promise<void>;

  /**
   * @example @Get("/:name") read() {}
   */
  read(
    query: FilterQuery<Document>,
    res: ExpressResponse,
    primaryFilter: string | undefined
  ): Promise<void>;

  /**
   * @example @Get("/") list() {
   *   this.read(...arguments)
   * }
   */
  list(query: FilterQuery<Document>, res: ExpressResponse): Promise<void>;

  /**
   * @example @Patch('/:name') update() {}
   */
  update(
    body: Document,
    res: ExpressResponse,
    primaryFilter: string
  ): Promise<void>;

  /**
   * @example @Delete('/') delete() {}
   */
  delete(
    query: FilterQuery<Document>,
    res: ExpressResponse,
    primaryFilter: string
  ): Promise<void>;
}
