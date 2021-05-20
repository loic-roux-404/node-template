import AuthenticationError from "./AuthenticationError";

export default class MissingTokenError extends AuthenticationError {
  constructor(message: string = "Missing authentication token") {
    super(message);
  }
}
