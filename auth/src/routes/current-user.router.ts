import express, { Request, Response } from "express";

const currentUserRouter = express.Router();

currentUserRouter.route("/currentuser").get((req: Request, res: Response) => {
  res.json({ message: "😊 Hello from express" });
});

export { currentUserRouter };
