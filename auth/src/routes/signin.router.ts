import express, { Request, Response } from "express";

const signinRouter = express.Router();

signinRouter.route("/signin").post((req: Request, res: Response) => {});

export { signinRouter };
