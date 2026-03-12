'use strict';

const express = require('express');
const cors = require('cors');

const setupSwagger = require('./docs/swagger');
const routes = require('./routes');

const httpRequestLoggerMiddleware = require('./middlewares/utils/http.requestLogger.middleware');
const requestIdMiddleware = require('./middlewares/utils/requestId.middleware');
// const healthMiddleware = require('./middlewares/utils/health.middleware');
const notFoundMiddleware = require('./middlewares/utils/notfound.middleware');
const errorMiddleware = require('./middlewares/utils/error.middleware');
const rejectGetBody = require('./middlewares/gateway/rejectGetBody');

const app = express();

/**
 * 1️⃣ CORS FIRST
 */

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://scan.ciyo.in',
        'https://scanner-nmg.vercel.app',
      ];

      // Allow server-to-server / curl / postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-App-Name',
      'X-Signature',
      'X-Internal-Secret',
      'X-Request-Id',
    ],
    exposedHeaders: ['X-Request-Id'],
    optionsSuccessStatus: 204,
  })
);

app.options('*', cors());

/**
 * 2️⃣ Body parsing
 */
app.use(express.json({ limit: '1mb' }));
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
// app.use(healthMiddleware);

/**
 * 5️⃣ Docs
 */
setupSwagger(app);

/**
 * 6️⃣ API routes (ALL security happens here)
 */
app.use('/api', routes);

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
