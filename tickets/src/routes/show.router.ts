import express, { Request, Response } from "express";
import { NotFoundError } from "@gsinghtickets/comm";
import { Ticket } from "../models/ticket.model";

const showTicketRouter = express.Router();

showTicketRouter
  .route(`/tickets/:id`)
  .get(async (req: Request, res: Response) => {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    res.send(ticket);
  });

export { showTicketRouter };
