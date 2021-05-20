import { Issuer, Strategy } from "openid-client";
import { OPEN_ID_ISSUER } from "../model/config";
import passport from "passport";
import parseFromEnv from "./parseFromEnv";

export const getClient = async function () {
  const issuer = await Issuer.discover(OPEN_ID_ISSUER);
  const client = new issuer.Client(parseFromEnv());

  return client;
};

export const getPassport = async function () {
  const client = await getClient();

  passport.use(
    "oidc",
    new Strategy({ client }, (tokenSet, _, done) => {
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
};
