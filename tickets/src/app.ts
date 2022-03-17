import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler, currentUser } from "@gsinghtickets/comm";
import { createTicketRouter } from "./routes/new.router";
import { showTicketRouter } from "./routes/show.router";
import { indexTicketRouter } from "./routes/index.router";
import { updateTicketRouter } from "./routes/update.router";

// INIT APP
const app = express();

// Tell express to trust this app even
// though it is sitting behind the nginx proxy
app.set("trust proxy", true);

// MIDDLEWARES
app.use(express.json());
app.use(
  cookieSession({
    // Using this library to send auth info/jwt token
    // as a cookie to the frontend
    signed: false,
    // Send cookie over the response object only if
    // the request is made over https, expect while testing
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

// MOUNT ROUTES
app.use(`/api`, createTicketRouter);
app.use(`/api`, indexTicketRouter);
app.use(`/api`, showTicketRouter);
app.use(`/api`, updateTicketRouter);

// 404 NOT FOUND ERROR
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// ERROR HANDLER
app.use(`*`, errorHandler);

export { app };
