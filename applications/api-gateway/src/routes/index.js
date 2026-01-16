"use strict";

const router = require("express").Router();

const envelopeSchema = require("../controllers/schemas/envelope.schema");
const { healthCheck } = require("../controllers/health/health.controller");
const { circuitBreakerController } = require("../controllers/circuitBreaker/circuitBreaker.controller");
const customProxy = require("../controllers/proxy/customProxy");
// Core middlewares
const requestContext = require("../middlewares/context/requestContext.middleware");
const authenticate = require("../middlewares/auth/auth.middleware");
const replay = require("../middlewares/replayChecks/replay.middleware");
const rateLimit = require("../middlewares/rateLimiting/rateLimit.middleware");
const fingerprint = require("../middlewares/device/fingerprint.middleware");
const validateSchema = require("../middlewares/schema/schema.middleware");
const threatScore = require("../middlewares/threat/threatScore.middleware");
const hmac = require("../middlewares/hmac/hmac.middleware");
const aiFirewall = require("../middlewares/aiFirewall/aiFirewall.middleware");



router.get("/health", healthCheck);


/**
 * SQL SERVICE
 */
router.use(
  "/sql",
  requestContext,
  authenticate,
  replay,
  rateLimit({ limit: 100, windowSeconds: 60 }),
  fingerprint,
  validateSchema(envelopeSchema),
  threatScore,
  hmac,
  customProxy("sql-service")
);

/**
 * MONGO SERVICE (STRICT)
 */
router.use(
  "/mongo",
  requestContext,
//   authenticate,  //jwt token after login from frontend
//   replay,  //jwt token will give userId
//   rateLimit({ limit: 80, windowSeconds: 60 }),    //jwt token will give userId
  fingerprint,
  validateSchema(envelopeSchema),
  threatScore,
  hmac,
  circuitBreakerController("mongo-service"),
  customProxy("mongo-service")
);

/**
 * AI SERVICE (MAX SECURITY)
 */
router.use(
  "/ai",
  requestContext,
  authenticate,
  replay,
  rateLimit({ limit: 20, windowSeconds: 60 }),
  fingerprint,
  aiFirewall,
  validateSchema(envelopeSchema),
  threatScore,
  hmac,
  customProxy("ai-service")
);

/**
 * WEBSOCKET SERVICE (LIGHT)
 */
router.use(
  "/ws",
  requestContext,
  authenticate,
  hmac,
  customProxy("websocket-service")
);

/**
 * PAYMENT SERVICE (VERY STRICT)
 */
router.use(
  "/payment",
  requestContext,
  authenticate,
  replay,
  rateLimit({ limit: 30, windowSeconds: 60 }),
  fingerprint,
  validateSchema(envelopeSchema),
  threatScore,
  hmac,
  customProxy("payment-service")
);

/**
 * MAIL SERVICE
 */
router.use(
  "/mail",
  requestContext,
  authenticate,
  rateLimit({ limit: 60, windowSeconds: 60 }),
  validateSchema(envelopeSchema),
  hmac,
  customProxy("mail-service")
);

/**
 * NOTIFICATION SERVICE
 */
router.use(
  "/notification",
  requestContext,
  authenticate,
  rateLimit({ limit: 100, windowSeconds: 60 }),
  validateSchema(envelopeSchema),
  hmac,
  customProxy("notification-service")
);

module.exports = router;




// "use strict";

// const router = require("express").Router();
// const proxy = require("../proxy/proxy");
// const { healthCheck} = require("../controllers/health.controller");
// const circuitBreakerMiddleware = require("../middlewares/circuitBreaker.middleware");
// // const serviceAvailability = require("../middlewares/serviceAvailability.middleware")

// router.get("/health", healthCheck);

// router.use("/sql", customProxy("sql-service"));
// router.use("/mongo", customProxy("mongo-service"),  );
// router.use("/ai", customProxy("ai-service"));
// router.use("/ws", customProxy("websocket-service"));
// router.use("/payment", customProxy("payment-service"));
// router.use("/mail", customProxy("mail-service"));
// router.use("/notification", customProxy("mail-service"));

// module.exports = router;
