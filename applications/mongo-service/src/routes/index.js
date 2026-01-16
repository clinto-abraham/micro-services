"use strict";

const router = require("express").Router();

const controller = require("../controllers/booking.controller");
const validate = require("../middlewares/validators");
const { bookingValidator } = require("../validators/booking.validator");
const { healthCheck } = require("../controllers/health.controller");
const healthAuth = require("../middlewares/healthAuth");
const healthRateLimit = require("../middlewares/healthRateLimit");
const seatController = require("../controllers/seat.controller");
const validate = require("../middlewares/validators");
const { createSeatValidator } = require("../validators/seat.validator");
/**
 * Single health endpoint
 * - Auth protected (optional)
 * - Rate limited
 * - Returns LIVE + READY
 */
router.get(
  "/health",
  healthAuth,        // 🔐 optional internal protection
  healthRateLimit,   // 🛡️ abuse protection
  healthCheck        // 🧠 core logic
);



router.post("/", validate(bookingValidator), controller.createBooking);
router.get("/", controller.getAllBookings);
router.get("/:id", controller.getBookingById);
router.delete("/:id", controller.deleteBooking);


router.post("/", validate(createSeatValidator), seatController.createSeat);
router.get("/", seatController.getSeats);

module.exports = router;
