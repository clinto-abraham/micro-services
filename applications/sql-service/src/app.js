"use strict";

const express = require("express");

const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const pingDB = require("./services/health/dependency/db.health.check");
const httpLoggerMiddleware = require("./middlewares/httpLogger.middleware");

const app = express();

pingDB();
/* ------------------ Global Middleware ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(httpLoggerMiddleware);

// app.use(dbRevival);
/* ------------------ Routes ------------------ */
app.use("/sql", routes);

/* ------------------ Error Handler ------------------ */
app.use(errorHandler);

module.exports = app;





// routes below


