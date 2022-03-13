import request from "supertest";
import { app } from "../../app";

describe(`[Signup Route]`, () => {
  it(`responds with status code 201 on successful signup`, async () => {
    return request(app)
      .post(`/api/users/signup`)
      .send({
        email: "t@t.com",
        password: "123456",
      })
      .expect(201);
  });
});
