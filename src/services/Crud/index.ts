import { CrudService } from "./CrudService";
import { Model } from "mongoose";

export { CrudService };

const crudFactory = (model: Model<any>): CrudService => {
  return new CrudService(model);
};

export const provider = { name: "CRUD_FACTORY", useFactory: crudFactory };

export default crudFactory;
