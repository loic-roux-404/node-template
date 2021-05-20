// Default to api authentication
process.env.OPENID_GRANTS_TYPES = "client_credentials";

export default ({
  env: {
    OPENID_CLIENT_ID,
    OPENID_CLIENT_SECRET,
    OPENID_GRANTS_TYPES,
    OPENID_REDIRECT_URIS,
  },
} = process) => ({
  client_id: OPENID_CLIENT_ID,
  client_secret: OPENID_CLIENT_SECRET,
  grant_types: OPENID_GRANTS_TYPES?.split(",") || [],
  redirect_uris: OPENID_REDIRECT_URIS?.split(",") || [],
  response_types: [],
});
