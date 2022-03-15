import express, { Request, Response } from "express";
import { currentUser } from "@gsinghtickets/comm";

const currentUserRouter = express.Router();

currentUserRouter
  .route("/currentuser")
  .get(currentUser, (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  });

export { currentUserRouter };
