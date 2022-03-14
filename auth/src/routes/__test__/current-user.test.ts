import { currentUser } from "./../../middlewares/current-user";
import request from "supertest";
import { app } from "../../app";
import {
  currentUserRouteAddress,
  signupRouteAddress,
} from "../../test/test.utils";

describe(`[Current User Route]`, () => {
  it(`returns null if a user is not signin in`, async () => {
    const response = await request(app)
      .get(currentUserRouteAddress)
      .expect(200);

    expect(response.body.currentUser).toEqual(null);
  });

  it(`returns current user information in response`, async () => {
    const authResponse = await request(app)
      .post(signupRouteAddress)
      .send({ email: "t@t.com", password: "123456" })
      .expect(201);

    const cookie = authResponse.get("Set-Cookie");

    const response = await request(app)
      .get(currentUserRouteAddress)
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.currentUser.email).toEqual("t@t.com");
  });
});
