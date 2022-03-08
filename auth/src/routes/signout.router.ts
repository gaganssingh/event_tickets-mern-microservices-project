import express, { Request, Response } from "express";

const signoutRouter = express.Router();

signoutRouter.route("/signout").post((req: Request, res: Response) => {});

export { signoutRouter };
