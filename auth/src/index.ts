import express from "express";
import "express-async-errors";
import mongoose from "mongoose";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user.router";
import { signinRouter } from "./routes/signin.router";
import { signoutRouter } from "./routes/signout.router";
import { signupRouter } from "./routes/signup.router";

// INIT APP
const app = express();

// MIDDLEWARES
app.use(express.json());

// MOUNT ROUTES
app.use(`/api/users`, currentUserRouter);
app.use(`/api/users`, signinRouter);
app.use(`/api/users`, signoutRouter);
app.use(`/api/users`, signupRouter);

// 404 NOT FOUND ERROR
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// ERROR HANDLER
app.use(`*`, errorHandler);

// MongoDB CONNECTION & SERVER START
(async () => {
  try {
    await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`);
    console.log(`[✔ AUTH DATABASE] Successfully connected`);
  } catch (err) {
    console.error(err);
  }

  // START SERVER
  app.listen(3000, () =>
    console.log(`[✔ AUTH SERVICE] Listening on PORT 3000`)
  );
})();
