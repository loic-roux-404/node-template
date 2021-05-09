import { InjectionToken } from "@decorators/di";
import { Provider } from "@decorators/di/lib/src/types";

export default (vars: object, useInjectionToken = false): Provider[] =>
  Object.entries(vars).map(
    ([k, v]): Provider => ({
      provide: useInjectionToken ? new InjectionToken(k) : k,
      useValue: v,
    })
  );
