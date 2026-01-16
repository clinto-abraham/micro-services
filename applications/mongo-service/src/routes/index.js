const express = require("express");
const router = express.Router();

const userController = require("../controllers/user/user.controller");
const eventController = require("../controllers/event/event.controller");

const featureFlag = require("../middlewares/gateway/featureFlag");
const validate = require("../validations/validate");
const enableIdempotency = require("../middlewares/gateway/enableIdempotency");

const { envelopeSchema } = require("../validations/envelope/envelope.schema");

const { createEventSchema, updateEventSchema, getEventByIdSchema } = require("../validations/event");
const { createUserSchema, getUserByIdSchema, updateUserSchema, deactivateUserSchema, bulkCreateUsersSchema, deleteUserSchema, createUserFromProviderSchema } = require("../validations/user");
const { createParticipantValidationSchema } = require("../validations/participant/participant.validation.schema");
const { createSeatValidationSchema } = require("../validations/seat/seat.validation.schema");
const { createParticipantController, listParticipantsController } = require("../controllers/participant/participant.controller");
const { createSeatController } = require("../controllers/seat/seat.controller");

module.exports = (redis) => {

  /* =======================
     1️⃣ USER 
  ======================= */
  /** CREATE USER */
  router.post(
    "/user/create",
    enableIdempotency,
    featureFlag("USER_CREATION", redis),
    validate({ envelopeSchema, payloadSchema: createUserSchema }),
    userController.createUser
  );

  /** CREATE USER FROM PROVIDER (OAuth / SSO) */
  router.post(
    "/users/provider",
    enableIdempotency,
    featureFlag("USER_PROVIDER_CREATION", redis),
    validate({ envelopeSchema, payloadSchema: createUserFromProviderSchema }),
    userController.createUserFromProvider
  );

  /** GET USER BY ID */
  router.post(
    "/user/get",
    enableIdempotency,
    featureFlag("USER_READ", redis),
    validate({ envelopeSchema, payloadSchema: getUserByIdSchema }),
    userController.getUserById
  );

  /** GET ALL USERS */
  router.post(
    "/users/get/all",
    enableIdempotency,
    featureFlag("USER_READ_ALL", redis),
    validate({ envelopeSchema }),
    userController.getAllUsers
  );

  /** UPDATE USER */
  router.put(
    "/user/update",
    enableIdempotency,
    featureFlag("USER_UPDATE", redis),
    validate({ envelopeSchema, payloadSchema: updateUserSchema }),
    userController.updateUser
  );

  /** DEACTIVATE USER (SOFT DELETE) */
  router.post(
    "/user/deactivate",
    enableIdempotency,
    featureFlag("USER_DEACTIVATE", redis),
    validate({ envelopeSchema, payloadSchema: deactivateUserSchema }),
    userController.deactivateUser
  );

  /** DELETE USER (HARD DELETE – single) */
  router.delete(
    "/user/delete",
    enableIdempotency,
    featureFlag("USER_DELETE", redis),
    validate({ envelopeSchema, payloadSchema: deleteUserSchema }),
    userController.deleteUser
  );

  /** BULK CREATE USERS */
  router.post(
    "/users/bulk",
    enableIdempotency,
    featureFlag("USER_BULK_CREATE", redis),
    validate({ envelopeSchema, payloadSchema: bulkCreateUsersSchema }),
    userController.bulkCreateUsers
  );

  /** DELETE ALL USERS (ADMIN ONLY) */
  router.delete(
    "/users/purge",
    enableIdempotency,
    featureFlag("USER_PURGE", redis),
    validate({ envelopeSchema }),
    userController.deleteAllUsers
  );

  /* =======================
     2️⃣ EVENT 
   ======================= */
  /** CREATE EVENT */
  router.post(
    "/event",
    enableIdempotency,
    featureFlag("EVENT_CREATION", redis),
    validate({ envelopeSchema, payloadSchema: createEventSchema }),
    eventController.createEvent
  );

  /** GET EVENTS */
  router.post(
    "/events/get/all",
    featureFlag("EVENT_READ", redis),
    eventController.getEvents
  );

  /** GET EVENT BY ID */
  router.get(
    "/events/:id",
    validate({ envelopeSchema, payloadSchema: getEventByIdSchema }),
    eventController.getEventById
  );

  /** UPDATE EVENT */
  router.put(
    "/events/:id",
    featureFlag("EVENT_UPDATE", redis),
    validate({ envelopeSchema, payloadSchema: updateEventSchema }),
    eventController.updateEvent
  );

  /** DELETE EVENT */
  router.delete(
    "/events/:id",
    featureFlag("EVENT_DELETE", redis),
    eventController.deleteEvent
  );

  /* =======================
   3️⃣ PARTICIPANTS
======================= */

router.post(
  "/participant",
  enableIdempotency,
  featureFlag("PARTICIPANT_CREATION", redis),
  validate({ envelopeSchema, payloadSchema: createParticipantValidationSchema }),
  createParticipantController
);

router.get(
  "/participants",
  listParticipantsController
);

/* =======================
   4️⃣ SEAT
======================= */

router.post(
  "/seat",
  enableIdempotency,
  featureFlag("SEAT_CREATION", redis),
  validate({ envelopeSchema, payloadSchema: createSeatValidationSchema }),
  createSeatController
);




  return router;
};






// "use strict";

// const router = require("express").Router();
// const validate = require("../validations/validate");
// const envelopeSchema = require("../validations/envelope.schema");

// // ---------- HEALTH ----------
// const { healthCheck } = require("../controllers/health.controller");
// const healthAuth = require("../middlewares/healthAuth");
// const healthRateLimit = require("../middlewares/healthRateLimit");

// router.get(
//   "/health",
//   healthAuth,        // 🔐 optional internal protection
//   healthRateLimit,   // 🛡️ abuse protection
//   healthCheck        // 🧠 core logic
// );

// router.get("/ping", (req, res) => {
//   res.json({ success: true, service: "mongo-service" });
// });

// const scanController = require("../controllers/scan.controller");
// const userController = require("../controllers/user.controller");
// const eventController = require("../controllers/event.controller");
// const qrController = require("../controllers/qr.controller");

// router.post("/qr/generate", qrController.generateQR);

// // ---------- SCAN ----------
// router.post("/scan/entry", scanController.scanEntry);
// router.post("/scan/food", scanController.scanFood);
// router.post("/scan/stay", scanController.scanStay);

// // ---------- USERS ----------


// const userSchemas = require("../validations/user");
// const userController = require("../controllers/user.controller");

// /**
//  * Create standard user
//  */

// router.post(
//   "/users",
//   featureFlag("USER_CREATION", redis),
// anti-replay
//   idempotency(redis),        // retry safety
//   validate({ envelopeSchema, payloadSchema }),
//   userController.createUser
// );

// /**
//  * Create / link provider user
//  */
// router.post(
//   "/users/provider",
//   validate({
//     envelopeSchema,
//     payloadSchema: userSchemas.createUser
//   }),
//   userController.createUserFromProvider
// );

// /**
//  * Soft delete user
//  */
// router.delete(
//   "/users",
//   validate({
//     envelopeSchema,
//     payloadSchema: userSchemas.deleteUser
//   }),
//   userController.deleteUser
// );


// router.get("/users/:id", userController.getUserById);
// router.put("/users/:id", userController.updateUser);
// router.delete("/users/:id", userController.deleteUser);

// // ---------- EVENTS ----------
// router.post("/events", eventController.createEvent);
// router.get("/events", eventController.getEvents);
// router.get("/events/:id", eventController.getEventById);
// router.put("/events/:id", eventController.updateEvent);
// router.delete("/events/:id", eventController.deleteEvent);


// const controller = require("../controllers/booking.controller");
// const { bookingValidator } = require("../validations/booking/booking.validator");
// const seatController = require("../controllers/seat.controller");
// const { createSeatValidator } = require("../validations/booking/seat.validation");

// router.post("/", validate(bookingValidator), controller.createBooking);
// router.get("/", controller.getAllBookings);
// router.get("/:id", controller.getBookingById);
// router.delete("/:id", controller.deleteBooking);


// router.post("/", validate(createSeatValidator), seatController.createSeat);
// router.get("/", seatController.getSeats);

// module.exports = router;
