export default class AuthenticationError extends Error {
  constructor(message: string = "authentication error") {
    super(message);
  }
}
