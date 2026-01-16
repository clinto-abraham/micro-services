"use strict";

const Joi = require("joi");

exports.createSeatValidation = Joi.object({
  seatNumber: Joi.string().required(),
  row: Joi.string().required(),
  price: Joi.number().min(1).required(),
  status: Joi.string().valid("available", "reserved", "blocked"),
  seatId: Joi.string().hex().length(24).required(),
  participantId: Joi.string().hex().length(24).required()
});
