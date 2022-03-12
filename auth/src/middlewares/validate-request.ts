import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if any errors are present on the req.body
  // using the express-validator lib
  const errors = validationResult(req);

  // If errors are found on req.body
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
