"use strict";

const helmet = require("helmet");
const cors = require("cors");
const { apiLimiter } = require("./rateLimiter");

module.exports = (app) => {
  // Basic security headers
  app.use(helmet());

  // Disable express fingerprinting
  app.disable("x-powered-by");

  // CORS — adjust based on your requirements
  app.use(
    cors({
      origin: "*", // change to your domain in production
      methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
  );

  // Rate limiting (protects routes from abuse)
  app.use(apiLimiter);
};
