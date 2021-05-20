import { Container } from "@decorators/di";
// providers
import ServerErrorMiddlewareProvider from "../middlewares/ServerErrorMiddleware";
import variableProvide from "../modules/framework/variableProvideToContainer";
import Globals from "./globals";
import db from "./database";

// Service which need manual instanciation
// Other service in services/ use the decorator
let services = [];

const middlewares = [ServerErrorMiddlewareProvider];

export default async () => {
  // Build full services
  services = [...services, ...variableProvide({ db: await db })];
  Container.provide([...variableProvide(Globals), ...services, ...middlewares]);
};
