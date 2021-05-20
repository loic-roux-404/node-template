export default class AuthenticationError extends Error {
  constructor(
    message: string = "Authentication error, token has probably expired."
  ) {
    super(message);
  }
}
