import mongoose from "mongoose";
import { app } from "./app";

// MongoDB CONNECTION & SERVER START
(async () => {
  if (!process.env.JWT_KEY) {
    throw new Error(`❌ JWT_KEY must be defined`);
  }
  if (!process.env.MONGO_URI) {
    throw new Error(`❌ JWT_KEY must be defined`);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`[✔ AUTH DATABASE] Successfully connected`);
  } catch (err) {
    console.error(err);
  }

  // START SERVER
  app.listen(3000, () =>
    console.log(`[✔ AUTH SERVICE] Listening on PORT 3000`)
  );
})();
