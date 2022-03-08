export class DatabaseConnectionError extends Error {
  reason = `Error connecting to the database`;
  constructor() {
    super();

    // Behind the scenes stuff
    // Required as this class extends the built-in Error class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
