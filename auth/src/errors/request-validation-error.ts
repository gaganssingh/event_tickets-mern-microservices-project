import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // Behind the scenes stuff
    // Required as this class extends the built-in Error class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
