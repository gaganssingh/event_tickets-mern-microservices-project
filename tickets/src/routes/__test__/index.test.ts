import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket.model";
import { generateTestTicket, ticketsRouteAddress } from "../../test/test.utils";

describe(`[Index Route]`, () => {
  it(`successfully retreives all tickets`, async () => {
    // Create 3 test tickets
    await generateTestTicket();
    await generateTestTicket();
    await generateTestTicket();

    // const tickets = await Ticket.find({});
    // expect(tickets.length).toEqual(3);

    const response = await request(app)
      .get(ticketsRouteAddress)
      .send()
      .expect(200);

    expect(response.body.length).toBe(3);
  });
});
