"use strict";
// Gateway should know when services are DOWN.

const axios = require("axios");
const services = require("../../docs/services");

const healthCache = {};

async function checkHealth() {
  for (const service of services) {
    try {
      await axios.get(service.url.replace("/openapi.json", "/health"), {
        timeout: 2000
      });
      healthCache[service.basePath] = true;
    } catch {
      healthCache[service.basePath] = false;
    }
  }
}

setInterval(checkHealth, 10000);
checkHealth();

module.exports = (req, res, next) => {
  const base = "/" + req.path.split("/")[1];
  if (healthCache[base] === false) {
    return res.status(503).json({
      message: "Service temporarily unavailable"
    });
  }
  next();
};
