import request from "supertest";
import { app } from "../../app";
import { generateTestCookie, signinRouteAddress } from "../../test/test.utils";

describe(`[Signin Route]`, () => {
  it(`responds with status code 400 if invalid email`, async () => {
    await request(app)
      .post(signinRouteAddress)
      .send({ email: "invalid", password: "123456" })
      .expect(400);
  });

  it(`responds with status code 400 if invalid password`, async () => {
    await request(app)
      .post(signinRouteAddress)
      .send({ email: "t@t.com", password: "" })
      .expect(400);
  });

  it(`responds with status code 400 if email doesn't exist`, async () => {
    await request(app)
      .post(signinRouteAddress)
      .send({ email: "t@t.com", password: "123456" })
      .expect(400);
  });

  it(`responds with status code 400 if password incorrect`, async () => {
    await generateTestCookie();

    return request(app)
      .post(signinRouteAddress)
      .send({ email: "t@t.com", password: "incorrectpassword" })
      .expect(400);
  });

  it(`successfully signs in a user`, async () => {
    await generateTestCookie();

    return request(app)
      .post(signinRouteAddress)
      .send({ email: "t@t.com", password: "123456" })
      .expect(200);
  });

  it(`responds with a cookie on successful signin`, async () => {
    const response = await generateTestCookie();

    expect(response).toBeDefined();
  });
});
