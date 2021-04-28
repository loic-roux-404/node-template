import { Container } from "@decorators/di";
// providers
import ServerMiddlewareProvider from "../middlewares/ServerErrorMiddleware";
import variableProvide from "../modules/variableProvideToContainer";
import Globals from "./globals";
import MongooseErrorMiddleware from "../middlewares/MongooseErrorMiddleware";

export default () =>
  Container.provide([
    ServerMiddlewareProvider,
    MongooseErrorMiddleware,
    ...variableProvide(Globals),
  ]);
