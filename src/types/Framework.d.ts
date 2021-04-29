/* eslint-disable @typescript-eslint/method-signature-style */
import { Document } from "mongoose";
import { Response as ExpressResponse } from "express";

export interface CRLUD {
  create(body: Document, res: ExpressResponse): Promise<void>;

  read(
    query: Document | {},
    username: string | undefined,
    res: any
  ): Promise<void>;

  list(query: Document | {}, res: ExpressResponse): Promise<void>;

  update(body: Document, res: ExpressResponse, username: string): Promise<void>;

  createListOrSingle(
    body: Document[] | Document,
    res: ExpressResponse
  ): Promise<void>;

  delete(body: Document, res: ExpressResponse, username: string): Promise<void>;
}
