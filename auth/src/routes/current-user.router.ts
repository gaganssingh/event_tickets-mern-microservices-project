import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";

const currentUserRouter = express.Router();

currentUserRouter
  .route("/currentuser")
  .get(currentUser, (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  });

export { currentUserRouter };
