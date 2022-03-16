import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

export const ticketsRouteAddress = `/api/tickets`;

// HELPER FUNCTIONS
export const generateTestId = () => new mongoose.Types.ObjectId().toHexString();

export const generateTestCookie = () => {
  // TEST credentials
  const user = {
    id: generateTestId(),
    email: "t@t.com",
  };

  // Generate a JWT
  const token = jwt.sign(user, process.env.JWT_KEY!);

  // Create a session object that mimics the actual
  // session object returned from the client
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");
  const encodedSession = `session=${base64}`;
  return [encodedSession];
};

export const generateTestTicket = async () => {
  const ticket = await request(app)
    .post(ticketsRouteAddress)
    .set("Cookie", generateTestCookie())
    .send({
      title: "content",
      price: 10,
    })
    .expect(201);

  return ticket;
};
