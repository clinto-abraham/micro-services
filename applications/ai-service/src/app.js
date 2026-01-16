"use strict";

const express = require("express");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());

app.use("/ai", routes);

app.get("/health", (_, res) => {
  res.json({ status: "AI service healthy" });
});

app.use(errorMiddleware);

module.exports = app;
