import parseFromEnv from "../client/parseFromEnv";

export const OPEN_ID_ISSUER =
  process.env.OPEN_ID_ISSUER ||
  `http://${process.env.IP}:${process.env.PORT}/auth`;

export default {
  clients: [parseFromEnv()], // TODO find clients in db
  scopes: ["api"],
  cookies: { keys: ["openid_app"] },
  features: {
    clientCredentials: { enabled: true },
    introspection: { enabled: true },
  },
};
