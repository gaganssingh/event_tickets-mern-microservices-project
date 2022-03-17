import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket.model";

const indexTicketRouter = express.Router();

indexTicketRouter.route("/tickets").get(async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export { indexTicketRouter };
