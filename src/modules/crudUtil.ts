import { Model } from "mongoose";

interface UtilQueryOnExisting {
  model: Model<any>;
  query: {};
  body: object;
}

interface QueryReturn {
  data: object;
  status: number;
}

export const updateUtil = async ({
  model,
  query,
  body,
}: UtilQueryOnExisting): Promise<QueryReturn> => {
  const data = await model.updateOne(query, body).exec();
  const status = determineStatus(data);

  return { status, data };
};

export const deleteUtil = async ({
  model,
  query,
  body,
}: UtilQueryOnExisting): Promise<QueryReturn> => {
  const data = await model.deleteOne(query, body).exec();
  const status = determineStatus(data, 200);

  return { status, data };
};

const determineStatus = (data: { n?: number }, statusOk = 201): number =>
  data.n != null && data.n > 0 ? statusOk : 404;
