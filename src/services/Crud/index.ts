import { CrudService } from "./CrudService";
import { Model } from "mongoose";
import { Provider } from "@decorators/di/lib/src/types";
import { InjectionToken } from "@decorators/di";

const crudFactory = (model: Model<any>): CrudService => {
  return new CrudService(model);
};

export { CrudService };

export const CrudFactoryProvider: Provider = {
  provide: new InjectionToken("crudFactory"),
  useFactory: crudFactory,
};

export default crudFactory;
