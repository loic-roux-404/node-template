import { Container } from "@decorators/di";
// providers
import ServerMiddlewareProvider from "../middlewares/ServerErrorMiddleware";
import variableProvide from "../modules/variableProvideToContainer";
import Globals from "./globals";
// import CrudFactoryProvider from "../services/Crud";

const middlewares = [ServerMiddlewareProvider];

// const factories = [CrudFactoryProvider];

const services = [];

export default () =>
  Container.provide([
    ...variableProvide(Globals),
    ...services,
    // ...factories,
    ...middlewares,
  ]);
