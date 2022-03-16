import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket.model";
import { generateTestCookie, ticketsRouteAddress } from "../../test/test.utils";

describe(`[New Route]`, () => {
  it(`has a route handler listening to /api/tickets for post requests`, async () => {
    const response = await request(app).post(ticketsRouteAddress).send({});

    expect(response.status).not.toEqual(404);
  });

  it(`can only be accesed by signed in users`, async () => {
    await request(app).post(ticketsRouteAddress).send({}).expect(401);
  });

  it(`return a status other than 401 if user is signed in`, async () => {
    const response = await request(app)
      .post(ticketsRouteAddress)
      .set("Cookie", generateTestCookie())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it(`returns an error if invalid title provided`, async () => {
    await request(app)
      .post(ticketsRouteAddress)
      .set("Cookie", generateTestCookie())
      .send({
        title: "",
        price: 10,
      })
      .expect(400);

    await request(app)
      .post(ticketsRouteAddress)
      .set("Cookie", generateTestCookie())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it(`returns an error if invalid price provided`, async () => {
    await request(app)
      .post(ticketsRouteAddress)
      .set("Cookie", generateTestCookie())
      .send({
        title: "title",
        price: -10,
      })
      .expect(400);

    await request(app)
      .post(ticketsRouteAddress)
      .set("Cookie", generateTestCookie())
      .send({
        title: "title",
      })
      .expect(400);
  });

  it(`creates a ticket with valid title & price`, async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const testTicket = {
      title: "title",
      price: 20,
    };

    await request(app)
      .post(ticketsRouteAddress)
      .set("Cookie", generateTestCookie())
      .send(testTicket)
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(testTicket.title);
    expect(tickets[0].price).toEqual(testTicket.price);
  });
});
