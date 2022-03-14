import request from "supertest";
import { app } from "../../app";
import { signoutRouteAddress, signupRouteAddress } from "../../test/test.utils";

describe(`[Signout Route]`, () => {
  it(`successfully signs out the user`, async () => {
    await request(app)
      .post(signupRouteAddress)
      .send({ email: "t@t.com", password: "123456" })
      .expect(201);

    await request(app).post(signoutRouteAddress).expect(200);
  });

  it(`clears the current user's session upon signout`, async () => {
    const signupResponse = await request(app)
      .post(signupRouteAddress)
      .send({ email: "t@t.com", password: "123456" })
      .expect(201);

    const signoutResponse = await request(app)
      .post(signoutRouteAddress)
      .expect(200);

    expect(signupResponse.get("Set-Cookie")[0].split(";")[0]).not.toEqual(
      signoutResponse.get("Set-Cookie")[0].split(";")[0]
    );
  });
});
