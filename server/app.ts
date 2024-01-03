// app.ts

import express from "express";

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

export default app;
