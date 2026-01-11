"use strict";

const { checkPaytm } = require("../services/paytm.health");
const { checkPhonePe } = require("../services/phonepe.health");
const { checkGooglePay } = require("../services/googlepay.health");
const { checkICICI } = require("../services/icici.health");
const { healthMeta } = require("../utils/health.meta");

const healthCheck = async (req, res) => {
  const start = Date.now();

  const results = await Promise.allSettled([
    checkPaytm(),
    checkPhonePe(),
    checkGooglePay(),
    checkICICI()
  ]);

  const [paytm, phonepe, googlepay, icici] = results.map(r =>
    r.status === "fulfilled" ? r.value : "DOWN"
  );

  const status =
    paytm === "UP" &&
    phonepe === "UP" &&
    googlepay === "UP" &&
    icici === "UP"
      ? "UP"
      : "DEGRADED";

  res.status(200).json({
    service: "payment-service",
    status,
    checks: {
      http: "UP",
      paytm,
      phonepe,
      googlepay,
      icici,
      ...healthMeta(start)
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = { healthCheck };
