import { CrudService } from "./CrudService";
import { Model } from "mongoose";

export function CrudGen(model: Model<any>) {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      public readonly crudService = new CrudService(model);
    };
  };
}

export { CrudService };
