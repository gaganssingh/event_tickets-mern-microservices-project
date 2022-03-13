import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      // Adding more properties to the default
      // express Request interface
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the the user had previously signed
  // We used cookie-session package to add the session obj with current user's info
  // to the request body
  if (!req.session?.jwt) {
    return next();
  }

  // If the session object is present on the req
  // verify the jwt token
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    // Add the current user's info on a currentUser
    // property on the req object
    req.currentUser = payload;
  } catch (err) {}

  next();
};
