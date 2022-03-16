import request from "supertest";
import { app } from "../../app";
import {
  generateTestId,
  generateTestTicket,
  ticketsRouteAddress,
} from "../../test/test.utils";

describe(`[Show Route]`, () => {
  it(`throws a 404 error if ticket not found`, async () => {
    const testId = generateTestId();
    await request(app).get(`${ticketsRouteAddress}/${testId}`).expect(404);
  });

  it(`successfully retreives a ticket if ticket found`, async () => {
    const response = await generateTestTicket();

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toEqual(response.body.title);
    expect(ticketResponse.body.price).toEqual(response.body.price);
  });
});
