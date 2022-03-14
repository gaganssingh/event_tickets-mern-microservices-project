import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongoInMemoryDbInstance: any;

beforeAll(async () => {
  // SETUP ALL REQUIRED ENV VARS
  process.env.JWT_KEY = "testJwtKey";

  mongoInMemoryDbInstance = await MongoMemoryServer.create();
  const mongoUri = await mongoInMemoryDbInstance.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let col of collections) {
    await col.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoInMemoryDbInstance.stop();
});
