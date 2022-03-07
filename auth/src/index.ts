import express from "express";

// INIT APP
const app = express();

// MIDDLEWARES
app.use(express.json());

// Routes
app.get("/api/users/currentuser", (req, res) => {
  res.send({ message: "Hello from express" });
});

// START SERVER
app.listen(3000, () => console.log(`[✔ AUTH SERVICE] Listening on PORT 3000`));
