"use strict";

const Joi = require("joi");

exports.bookingValidator = Joi.object({
  seatNumber: Joi.string().required(),
  row: Joi.string().required(),
  showId: Joi.string().optional().allow(null),
  price: Joi.number().min(0).required(),
  
  // the gateway will inject userId after decoding JWT
  userId: Joi.string().optional(),

  // optional additional booking info
  metadata: Joi.object().optional()
});
