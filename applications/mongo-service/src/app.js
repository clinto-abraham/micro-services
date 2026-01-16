const express = require("express");

const connectMongo = require("./configs/mongoose");
const logger = require("./configs/logger");
const routes = require("./routes");
const security = require("./middlewares/security");
const errorHandler = require("./middlewares/errorHandler");


const app = express();

// Middleware
app.use(express.json());
security(app);

// Database connection
connectMongo();

// Final error handler
app.use(errorHandler);

app.locals.serviceStartTime = Date.now();

app.use("/mongo", routes);

module.exports = app;
