import { Container } from "@decorators/di";
// providers
import ServerErrorMiddlewareProvider from "../middlewares/ServerErrorMiddleware";
import { objectToProviders } from "../modules/framework";
import Globals from "./globals";
import db from "./database";

// Service which need manual instanciation
// Other service in services/ use the decorator
let services = [];

const middlewares = [ServerErrorMiddlewareProvider];

export default async (lazyServices = {}) => {
  // Combine lazy and base services
  services = [
    ...services,
    ...objectToProviders({ db: await db }),
    ...objectToProviders(lazyServices),
  ];
  Container.provide([
    ...objectToProviders(Globals),
    ...services,
    ...middlewares,
  ]);
};
