import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");

    // Behind the scenes stuff
    // Required as this class extends the built-in Error class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "❌ Not Found" }];
  }
}
