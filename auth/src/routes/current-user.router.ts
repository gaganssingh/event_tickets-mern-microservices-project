import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const currentUserRouter = express.Router();

currentUserRouter
  .route("/currentuser")
  .get(currentUser, requireAuth, (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  });

export { currentUserRouter };
