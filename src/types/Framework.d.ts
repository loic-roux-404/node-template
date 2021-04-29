/* eslint-disable @typescript-eslint/method-signature-style */
import { Document } from "mongoose";
import { Response as ExpressResponse } from "express";

/**
 * Crud rules
 */
export interface CRLUD {
  /**
   * @example @Put("/") read() {}
   */
  create(body: Document, res: ExpressResponse): Promise<void>;

  /**
   * Optional method to create a batch of entities
   *
   * @example @Post('/') createListOrSingle() {}
   */
  batchCreate?(
    body: Document[] | Document,
    res: ExpressResponse
  ): Promise<void>;

  /**
   * @example @Get("/:name") read() {}
   */
  read(query: Document | {}, name: string | undefined, res: any): Promise<void>;

  /**
   * @example @Get("/") list() {
   *   this.read(...arguments)
   * }
   */
  list(query: Document | {}, res: ExpressResponse): Promise<void>;

  /**
   * @example @Patch('/:name') update() {}
   */
  update(body: Document, res: ExpressResponse, name: string): Promise<void>;

  /**
   * @example @Delete('/') delete() {}
   */
  delete(body: Document, res: ExpressResponse, name: string): Promise<void>;
}
