import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = `Error connecting to the database`;

  constructor() {
    super("Error connecting to the database");

    // Behind the scenes stuff
    // Required as this class extends the built-in Error class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
