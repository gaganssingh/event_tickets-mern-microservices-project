import request from "supertest";
import { app } from "../../app";
import { generateTestCookie, signupRouteAddress } from "../../test/test.utils";

describe(`[Signup Route]`, () => {
  it(`responds with status code 400 when supplied invalid email`, async () => {
    return request(app)
      .post(signupRouteAddress)
      .send({
        email: "invalid",
        password: "123456",
      })
      .expect(400);
  });

  it(`responds with status code 400 when supplied invalid password`, async () => {
    return request(app)
      .post(signupRouteAddress)
      .send({
        email: "invalid",
        password: "123456",
      })
      .expect(400);
  });

  it(`responds with status code 400 when supplied invalid email & password`, async () => {
    return request(app)
      .post(signupRouteAddress)
      .send({
        email: "",
        password: "",
      })
      .expect(400);
  });

  it(`responds with status code 400 when missing email or password`, async () => {
    await request(app)
      .post(signupRouteAddress)
      .send({ email: "t@t.com" })
      .expect(400);

    return request(app)
      .post(signupRouteAddress)
      .send({ password: "123456" })
      .expect(400);
  });

  it(`responds with status code 201 on successful signup`, async () => {
    return request(app)
      .post(signupRouteAddress)
      .send({
        email: "t@t.com",
        password: "123456",
      })
      .expect(201);
  });

  it.only(`returns a 400 error when signing up with an existing email`, async () => {
    await request(app)
      .post(signupRouteAddress)
      .send({ email: "t@t.com", password: "123456" })
      .expect(201);

    return request(app)
      .post(signupRouteAddress)
      .send({ email: "t@t.com", password: "123456" })
      .expect(400);
  });

  it(`successfully sets a cookie on response object after signup`, async () => {
    const response = await request(app)
      .post(signupRouteAddress)
      .send({ email: "t@t.com", password: "123456" })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
