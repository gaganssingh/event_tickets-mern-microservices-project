import mongoose from "mongoose";
import { app } from "./app";

// MongoDB CONNECTION & SERVER START
(async () => {
  if (!process.env.JWT_KEY) {
    throw new Error(`❌ JWT_KEY must be defined`);
  }
  try {
    await mongoose.connect(`mongodb://tickets-mongo-srv:27017/tickets`);
    console.log(`[✔ TICKETS DATABASE] Successfully connected`);
  } catch (err) {
    console.error(err);
  }

  // START SERVER
  app.listen(3000, () =>
    console.log(`[✔ TICKETS SERVICE] Listening on PORT 3000`)
  );
})();
