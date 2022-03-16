import request from "supertest";
import { app } from "../app";

export const signupRouteAddress = `/api/users/signup`;
export const signinRouteAddress = `/api/users/signin`;
export const signoutRouteAddress = `/api/users/signout`;
export const currentUserRouteAddress = `/api/users/currentuser`;

// HELPER FUNCTIONS
export const generateTestCookie = async () => {
  const email = "t@t.com";
  const password = "123456";

  const response = await request(app)
    .post(signupRouteAddress)
    .send({ email, password })
    .expect(201);

  return response.get("Set-Cookie");
};
