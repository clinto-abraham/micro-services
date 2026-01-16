"use strict";

const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const connectDB = require("./db");

const requestLogger = require("./middlewares/logging/requestLogger");
const auditLogger = require("./middlewares/logging/auditLogger");
const allowlistMiddleware = require("./middlewares/gateway/allowlist");
const verifyGatewayHmacMiddleware = require("./middlewares/gateway/verifyGatewayHmac");
const rateLimiterMiddleware = require("./middlewares/rateLimiting/rateLimiter");
const replayProtection = require("./middlewares/gateway/replayProtection");
const idempotency = require("./middlewares/gateway/idempotency");
const internalAuth = require("./middlewares/auth/internalAuth.middleware");
const notFound = require("./middlewares/errors/notFound.middleware");
const errorHandler = require("./error/errorHandler");

const redis = require("./db/redis");
const gatewayContextMiddleware = require("./middlewares/gateway/gatewayContext.middleware");
// const redis = require("./configs/redis");

const app = express();
console.log(1)
/* =======================
   1️⃣ CORS (FIRST – edge)
======================= */
app.use(
  cors({
    origin: [
      "http://localhost:2000",
      "http://localhost:2001",
      "http://localhost:2002",
      "http://localhost:2003"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-gateway-signature",
      "x-forwarded-for",
      "x-trace-id",
      "x-request-source",
      "x-environment"
    ],
    exposedHeaders: ["x-trace-id"]
  })
);

app.options("*", cors());

console.log(2)
/* =======================
   2️⃣ BODY PARSER
======================= */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
console.log(3)
/* =======================
   3️⃣ REQUEST LOGGER
======================= */
app.use(requestLogger);
console.log(4)
/* =======================
   4️⃣ NETWORK TRUST
======================= */
app.use(internalAuth);
app.use(gatewayContextMiddleware);
app.use(allowlistMiddleware);
console.log(5)
/* =======================
   5️⃣ GATEWAY AUTHENTICITY
======================= */
app.use(verifyGatewayHmacMiddleware);
console.log(6)
/* =======================
   6️⃣ REPLAY ATTACK PROTECTION
======================= */
app.use(replayProtection(redis));
console.log(7)
/* =======================
   7️⃣ IDEMPOTENCY (WRITE SAFETY)
======================= */
app.use(idempotency(redis));
console.log(8)
/* =======================
   8️⃣ RATE LIMITING (DB PROTECTION)
======================= */
app.use(rateLimiterMiddleware(redis));
console.log(9)
/* =======================
   9️⃣ DATABASE CONNECTION
======================= */
connectDB();
console.log(10)
/* =======================
   🔟 ROUTES (BUSINESS LOGIC)
======================= */
app.use("/", routes(redis));
console.log(11)
app.use(notFound);
/* =======================
   1️⃣1️⃣ AUDIT LOGGING
======================= */
app.use(auditLogger);
console.log(12)
/* =======================
   1️⃣2️⃣ FINAL ERROR HANDLER
======================= */
app.use(errorHandler);
console.log(13)
/* =======================
   APP METADATA
======================= */
app.locals.serviceStartTime = Date.now();

module.exports = app;

