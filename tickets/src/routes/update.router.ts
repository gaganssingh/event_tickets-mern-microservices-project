import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@gsinghtickets/comm";
import { Ticket } from "../models/ticket.model";

const updateTicketRouter = express.Router();

updateTicketRouter
  .route(`/tickets/:id`)
  .put(
    requireAuth,
    [
      body("title").notEmpty().withMessage("Please provide a valid title"),
      body("price")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const ticketId = req.params.id;

      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        throw new NotFoundError();
      }

      // Check if ticket owner & user updating the ticket are the same
      if (req.currentUser!.id !== ticket.userId) {
        throw new NotAuthorizedError();
      }

      // Everything checks out, lets update the ticket
      const { title, price } = req.body;
      ticket.set({ title, price });

      // Save updated ticket to db
      await ticket.save();

      return res.status(204).send(ticket);
    }
  );

export { updateTicketRouter };
