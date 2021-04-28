import { Container } from "@decorators/di";
// providers
import ServerMiddlewareProvider from "../middlewares/ServerErrorMiddleware";
import variableProvide from "../modules/variableProvideToContainer";
import Globals from "./globals";

export default () =>
  Container.provide([ServerMiddlewareProvider, ...variableProvide(Globals)]);
