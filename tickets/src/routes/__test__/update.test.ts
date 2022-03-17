import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket.model";
import {
  generateTestCookie,
  generateTestId,
  generateTestTicket,
  ticketsRouteAddress,
} from "../../test/test.utils";

describe(`[Update Route]`, () => {
  it(`returns a 404 if the supplied id is invalid`, async () => {
    await request(app)
      .put(`${ticketsRouteAddress}/${generateTestId()}`)
      .set("Cookie", generateTestCookie())
      .send({
        title: "updated",
        price: 20,
      })
      .expect(404);
  });

  it(`returns a 401 is user is not authenticated`, async () => {
    await request(app)
      .put(`${ticketsRouteAddress}/${generateTestId()}`)
      .send({
        title: "updated",
        price: 10,
      })
      .expect(401);
  });

  it(`returns a 401 if user doesn't own the ticket`, async () => {
    const ticket = await generateTestTicket();

    await request(app)
      .put(`${ticketsRouteAddress}/${ticket.body.id}`)
      .set("Cookie", generateTestCookie())
      .send({
        title: "updated",
        price: 10,
      })
      .expect(401);
  });

  it(`returns a 400 if user provides invalid title`, async () => {
    const ticket = await generateTestTicket();

    await request(app)
      .put(`${ticketsRouteAddress}/${ticket.body.id}`)
      .set("Cookie", generateTestCookie())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it(`returns a 400 if user provides invalid price`, async () => {
    const ticket = await generateTestTicket();

    await request(app)
      .put(`${ticketsRouteAddress}/${ticket.body.id}`)
      .set("Cookie", generateTestCookie())
      .send({
        title: "updated",
      })
      .expect(400);
  });

  it(`successfully updated the ticket using valid ticket & price`, async () => {
    const userCookie = generateTestCookie();

    // Create a ticket using the cookie above
    const ticket = await request(app)
      .post(`/api/tickets`)
      .set("Cookie", userCookie)
      .send({
        title: "title",
        price: 10,
      })
      .expect(201);

    const updatedTicket = {
      title: "updated title",
      price: 599,
    };

    await request(app)
      .put(`${ticketsRouteAddress}/${ticket.body.id}`)
      .set("Cookie", userCookie)
      .send({
        title: updatedTicket.title,
        price: updatedTicket.price,
      })
      .expect(204);

    const updated = await request(app).get(
      `${ticketsRouteAddress}/${ticket.body.id}`
    );

    expect(updated.body.title).toEqual(updatedTicket.title);
    expect(updated.body.price).toEqual(updatedTicket.price);
  });
});
