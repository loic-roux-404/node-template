import { InjectionToken } from "@decorators/di";

export default (vars: object) => Object.entries(vars).map(([k, v]: any) => ({
  provider: new InjectionToken(k),
  useValue: v
}))
