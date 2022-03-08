// Abstract classes will act as in "interface", providing
// rules/guidence to inheriting classes on what they need to implement
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // Behind the scenes stuff
    // Required as this class extends the built-in Error class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
