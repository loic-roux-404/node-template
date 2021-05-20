import { Issuer, Strategy } from "openid-client";
import { OPEN_ID_ISSUER } from "../model/config";
import passport from "passport";
import parseFromEnv from "./parseFromEnv";

/**
 * @param {Express} app
 *
 * @returns {any}
 */
export default (async () => {
  const issuer = await Issuer.discover(OPEN_ID_ISSUER);
  const client = new issuer.Client(parseFromEnv());

  passport.use(
    "oidc",
    new Strategy({ client }, (tokenSet, userinfo, done) => {
      console.log(userinfo);
      done(null, tokenSet.claims());
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  return passport;
})();
