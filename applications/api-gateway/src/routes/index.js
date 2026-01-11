"use strict";

const router = require("express").Router();
const proxy = require("../proxy/proxy");
const { healthCheck} = require("../controllers/health.controller");

router.get("/health", healthCheck);

router.use("/sql-service", proxy("sql-service"));
router.use("/mongo-service", proxy("mongo-service"));
router.use("/ai-service", proxy("ai-service"));
router.use("/websocket-service", proxy("websocket-service"));
router.use("/payment-service", proxy("payment-service"));
router.use("/mail-service", proxy("mail-service"));

module.exports = router;
