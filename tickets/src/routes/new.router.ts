import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@gsinghtickets/comm";
import { Ticket } from "../models/ticket.model";

const createTicketRouter = express.Router();

createTicketRouter
  .route(`/tickets`)
  .post(
    requireAuth,
    [
      body("title").notEmpty().withMessage("Please provide a valid title"),
      body("price")
        .isFloat({ gt: 0 })
        .withMessage("Price muct be greater than 0"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { title, price } = req.body;

      const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id,
      });
      await ticket.save();

      return res.status(201).send(ticket);
    }
  );

export { createTicketRouter };
