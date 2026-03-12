const express = require("express");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");

const userController = require("../controllers/user.controller");
const userValidation = require("../validations/user.validation");
const { healthCheck } = require("../controllers/health.controller");
const healthAuth = require("../middlewares/healthAuth");
const healthRateLimit = require("../middlewares/healthRateLimit");
const internalAuth = require("../middlewares/internalAuth");
const { getAppConfig } = require("../controllers/appConfig.controller");

const router = express.Router();

/**
 * ---------------------------
 * Health Check (LB / Gateway)
 * ---------------------------
 */
router.get("/health", healthAuth, healthRateLimit, healthCheck);

/**
 * ---------------------------
 * Internal routing config (Gateway)
 * ---------------------------
 */
router.get("/internal/app-configs/:appName", internalAuth, getAppConfig);


/**
 * ---------------------------
 * User Auth Routes
 * ---------------------------
 */
router.post(
  "/users/register",
  validate(userValidation.register),
  userController.register
);

router.post(
  "/users/login",
  validate(userValidation.login),
  userController.login
);

/**
 * ---------------------------
 * Protected User Routes
 * ---------------------------
 */
router.get(
  "/users/me",
  auth,
  userController.profile
);

router.patch(
  "/users/:id/status",
  auth,
  userController.updateStatus
);

module.exports = router;
