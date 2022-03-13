import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const currentUserRouter = express.Router();

currentUserRouter.route("/currentuser").get((req: Request, res: Response) => {
  console.log("req.session.jwt", req.session?.jwt);
  // Check if the the user had previously signed
  // We used cookie-session package to add the session obj with current user's info
  // to the request body
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  // If the session object is present on the req
  // verify the jwt token
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    return res.send({ currentUser: null });
  }
});

export { currentUserRouter };
