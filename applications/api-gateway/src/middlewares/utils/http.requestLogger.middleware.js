"use strict";

const httpRequestLoggerMiddleware = (req, res, next) => {
  const start = Date.now();

  // Log incoming request
  console.log(
    `➡️  ${req.method} ${req.originalUrl}`,
    req.body && Object.keys(req.body).length
      ? `| body: ${JSON.stringify(req.body)}`
      : ""
  );

  // Capture response body
  const originalSend = res.send;
  let responseBody;

  res.send = function (body) {
    responseBody = body;
    return originalSend.call(this, body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
      `⬅️  ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duration}ms`
    );

    // Optional: log response body (truncate large responses)
    if (responseBody) {
      const bodyStr =
        typeof responseBody === "string"
          ? responseBody
          : JSON.stringify(responseBody);

      console.log(
        `📦 Response:`,
        bodyStr.length > 500 ? bodyStr.slice(0, 500) + "..." : bodyStr
      );
    }
  });

  next();
};


module.exports = httpRequestLoggerMiddleware;