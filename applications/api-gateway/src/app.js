"use strict";

const express = require("express");
const cors = require("cors");

const setupSwagger = require("./docs/swagger");
const routes = require("./routes");

const httpRequestLoggerMiddleware = require("./middlewares/utils/http.requestLogger.middleware");
const requestIdMiddleware = require("./middlewares/utils/requestId.middleware");
const healthMiddleware = require("./middlewares/utils/health.middleware");
const notFoundMiddleware = require("./middlewares/utils/notfound.middleware");
const errorMiddleware = require("./middlewares/utils/error.middleware");
const rejectGetBody = require("./middlewares/gateway/rejectGetBody");

const app = express();

/**
 * 1️⃣ CORS FIRST
 */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"]
}));

app.use(cors({
  origin: ["http://localhost:5173"], // React app
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],
  exposedHeaders: [
    "x-request-id"
  ]
}));


app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-Key, X-Signature, X-Timestamp, X-Request-Id"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


/**
 * 2️⃣ Body parsing
 */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(rejectGetBody);
/**
 * 3️⃣ Request tracing & logging
 */
app.use(requestIdMiddleware);
app.use(httpRequestLoggerMiddleware);

/**
 * 4️⃣ Health (gateway + downstream)
 */
app.use(healthMiddleware);

/**
 * 5️⃣ Docs
 */
setupSwagger(app);

/**
 * 6️⃣ API routes (ALL security happens here)
 */
app.use("/api", routes);

/**
 * 7️⃣ Errors
 */
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;



// "use strict";

// const express = require("express");
// const setupSwagger = require("./docs/swagger");
// const cors = require("cors");
// const routes = require("./routes");

// const spikeProtector = require("./security/spikeProtector");
// const rateLimiter = require("./security/rateLimiter");
// const aiTrafficGuard = require("./security/aiTrafficGuard");

// // const authMiddleware = require("./middlewares/auth.middleware");
// // const loggerMiddleware = require("./middlewares/logger.middleware");
// const healthMiddleware = require("./middlewares/health.middleware");
// const notFoundMiddleware = require("./middlewares/notfound.middleware");
// const errorMiddleware = require("./middlewares/error.middleware");


// const httpRequestLoggerMiddleware = require("./middlewares/http.requestLogger.middleware");
// const requestIdMiddleware = require("./middlewares/requestId.middleware");


// const app = express();

// // 1️⃣ CORS FIRST
// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.options("*", cors());

// // 2️⃣ Body parser AFTER CORS
// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true }));


// app.use(spikeProtector);
// app.use(rateLimiter);
// app.use(aiTrafficGuard);

// app.use(httpRequestLoggerMiddleware);
// app.use(requestIdMiddleware);
// // app.use(loggerMiddleware);
// app.use(healthMiddleware);

// setupSwagger(app);

// app.use("/api", routes);

// app.use(notFoundMiddleware);
// app.use(errorMiddleware);

// module.exports = app;

