import { Response as ExpressResponse } from "express";

export interface QueryReturn {
  data: object;
  status: number;
}

export function jsonWithStatus(
  res: ExpressResponse,
  { status, data }: QueryReturn
): void {
  res.status(status).json(data);
}
