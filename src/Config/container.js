import { Container } from "@decorators/di";
// providers
import ServerMiddlewareProvider from "../middlewares/ServerErrorMiddleware";
import variableProvide from "../modules/variableProvideToContainer";
import Globals from "./globals";

const middlewares = [ServerMiddlewareProvider];

export default () =>
  Container.provide([...middlewares, ...variableProvide(Globals)]);
