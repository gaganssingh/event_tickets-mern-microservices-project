import request from "supertest";
import { app } from "../../app";
import {
  generateTestCookie,
  signoutRouteAddress,
  signupRouteAddress,
} from "../../test/test.utils";

describe(`[Signout Route]`, () => {
  it(`successfully signs out the user`, async () => {
    await request(app)
      .post(signoutRouteAddress)
      .set("Cookie", await generateTestCookie())
      .expect(200);
  });

  it(`clears the current user's session upon signout`, async () => {
    const signupCookie = await generateTestCookie();

    const signoutResponse = await request(app)
      .post(signoutRouteAddress)
      .expect(200);

    const signoutCookie = signoutResponse.get("Set-Cookie");

    expect(signupCookie[0].split(";")[0]).not.toEqual(
      signoutCookie[0].split(";")[0]
    );
  });
});
