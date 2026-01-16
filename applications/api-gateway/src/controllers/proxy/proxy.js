"use strict";

const { createProxyMiddleware } = require("http-proxy-middleware");
const SERVICE_MAP = require("./service-map");

module.exports = (serviceKey) => {
  console.log("👉 entering proxy");
  const service = SERVICE_MAP[serviceKey];

  if (!service) {
    throw new Error(`Unknown service: ${serviceKey}`);
  }

  return createProxyMiddleware({
    target: service.target,
    changeOrigin: true,

    // Strip service prefix // // ✅ Strip /api/mongo → /events
    pathRewrite: {
      [`^/api/${service.publicPrefix}`]: ""
    },

    proxyTimeout: 5000, // ⏱️ upstream timeout
    timeout: 6000,      // ⏱️ socket timeout

    onProxyReq(proxyReq, req) {
      console.log(27)
      // Forward auth if present
      if (req.headers.authorization) {
        proxyReq.setHeader(
          "Authorization",
          req.headers.authorization
        );
      }

      // Correlation ID
      if (req.headers["x-request-id"]) {
        proxyReq.setHeader(
          "X-Request-ID",
          req.headers["x-request-id"]
        );
      }

      // 🔒 INTERNAL AUTH (NEW)
      proxyReq.setHeader(
        "x-internal-secret",
        process.env.INTERNAL_SERVICE_SECRET
      );

      console.log(req.body, "inside of onProxyReq req.body")
      if (req.body && Object.keys(req.body).length > 0) {
        const bodyData = JSON.stringify(req.body);

        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

        proxyReq.write(bodyData);
      }
    },

    onError(err, req, res) {
      console.error("⏱️ Proxy timeout / error:", err.message);
      res.status(504).json({
        success: false,
        errorCode: "UPSTREAM_TIMEOUT",
        message: "Service did not respond in time"
      });
    }
  });
};





// "use strict";

// const { createProxyMiddleware } = require("http-proxy-middleware");
// const SERVICE_MAP = require("./service-map");

// module.exports = (serviceKey) => {
//   const service = SERVICE_MAP[serviceKey];

//   if (!service) {
//     throw new Error(`Unknown service: ${serviceKey}`);
//   }

//   return createProxyMiddleware({
//     target: service.target,
//     changeOrigin: true,
//     pathRewrite: {
//       [`^/${serviceKey}`]: ""
//     },
//     onProxyReq(proxyReq, req) {
//       // Forward auth if present
//       if (req.headers.authorization) {
//         proxyReq.setHeader("Authorization", req.headers.authorization);
//       }

//       // Correlation ID
//       if (req.headers["x-request-id"]) {
//         proxyReq.setHeader("X-Request-ID", req.headers["x-request-id"]);
//       }

//       // 🔒 INTERNAL AUTH (NEW)
//       proxyReq.setHeader(
//         "x-internal-secret",
//         process.env.INTERNAL_SERVICE_SECRET
//       );
//     }
//   });
// };
