import express, { Request, Response } from "express";

const signoutRouter = express.Router();

signoutRouter.route("/signout").post((req: Request, res: Response) => {
  req.session = null;

  return res.send({ message: "Signed out successfully" });
});

export { signoutRouter };
