import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const ticketsRouteAddress = `/api/tickets`;

// HELPER FUNCTIONS
export const generateTestCookie = () => {
  // TEST credentials
  const user = {
    id: new mongoose.Types.ObjectId().toHexString(),
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
