import { InjectionToken } from "@decorators/di";

export default (vars) =>
  Object.entries(vars).map(([k, v]) => ({
    provider: new InjectionToken(k),
    useValue: v,
  }));
