import { Model } from "mongoose";
import { Response as ExpressResponse } from "express";
import isEmpty from "lodash/isEmpty";

interface QueryObject {
  [key: string]: any;
}
interface UtilQueryOnExisting {
  model: Model<any>;
  query: QueryObject;
  body: object;
}

interface QueryReturn {
  data: object;
  status: number;
}

export const readUtil = async (
  { model: Model, query }: Omit<UtilQueryOnExisting, "body">,
  queryOverride: QueryObject = {}
): Promise<QueryReturn> => {
  Object.entries(queryOverride).forEach(([k, v]: [string, any]) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (v == null) delete queryOverride[k];
  });
  const finalQuery = isEmpty(queryOverride) !== true ? queryOverride : query;
  const data = (await Model.find(finalQuery)) ?? [];
  return {
    data,
    status: readStatus(data, 200),
  };
};

export const createUtil = async ({
  model: Model,
  body,
}: Omit<UtilQueryOnExisting, "query">): Promise<QueryReturn> => {
  const data = (await Model.create(new Model(body))) ?? [];
  return {
    data,
    status: createStatus(data),
  };
};

export const createMulUtil = async ({
  model: Model,
  body,
}: Omit<UtilQueryOnExisting, "query">): Promise<QueryReturn> => {
  const data =
    (await Model.insertMany(
      body instanceof Array ? body.map((e) => new Model(e)) : [new Model(body)]
    )) ?? [];

  return {
    data,
    status: createStatus(data),
  };
};

export const updateUtil = async ({
  model: Model,
  query,
  body,
}: UtilQueryOnExisting): Promise<QueryReturn> => {
  const data = (await Model.updateOne(query, body).exec()) ?? [];
  const status = updateStatus(data);

  return { status, data };
};

export const deleteUtil = async ({
  model,
  query,
  body,
}: UtilQueryOnExisting): Promise<QueryReturn> => {
  const data = (await model.deleteOne(query, body).exec()) ?? [];
  const status = updateStatus(data, 200);

  return { status, data };
};

export function jsonWithStatus(
  res: ExpressResponse,
  { status, data }: QueryReturn
): void {
  res.status(status).json(data);
}

interface DataIn {
  _id?: string;
}

const readStatus = (data: DataIn[], statusOk = 200): number => {
  if (data.length < 1) return 204;
  return data[0]?._id != null ? statusOk : 404;
};

const createStatus = (data: DataIn, statusOk = 201): number =>
  data?._id != null ? statusOk : 400;

const updateStatus = (data: { n?: number }, statusOk = 201): number =>
  data?.n != null && data.n > 0 ? statusOk : 404;
