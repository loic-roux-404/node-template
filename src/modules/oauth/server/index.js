import oidc from "./oidc";
import { getClient, getPassport } from "../client";

const defaults = {
  standalone: false,
  config: { loginUser: false },
};

/**
 * Return a password authenticator or openid client
 *
 * @param {Express} app
 * @param {object} param1
 */
export default async function (app, { config: { loginUser } } = defaults) {
  app.enable("trust proxy");
  app.use("/auth", oidc.callback());

  if (loginUser) {
    // TODO auth routes
    const passport = await getPassport();
    app.use(passport.initialize());
    return passport;
  } else {
    return await getClient();
  }
}
