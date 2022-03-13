import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

// ASSUMPTION:
// This middleware always runs after the current user middleware
// (to check if the user making the request is signed in or not)
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If the user is NOT logged in
  // (meaning this middlweare is called before the current-user middleware)
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
