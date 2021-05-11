import { Container } from "@decorators/di";
// providers
import ServerMiddlewareProvider from "../middlewares/ServerErrorMiddleware";
import variableProvide from "../modules/variableProvideToContainer";
import Globals from "./globals";
import dbConnect from "./database";

const middlewares = [ServerMiddlewareProvider];

const services = [
  // Database connection as service
  ...variableProvide({ db: dbConnect() }),
];

export default () =>
  Container.provide([...variableProvide(Globals), ...services, ...middlewares]);
