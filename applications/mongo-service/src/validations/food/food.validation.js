



"use strict";

const Joi = require("joi");

exports.addFood = Joi.object({
  participantId: Joi.string().hex().length(24).required(),
  eventDayId: Joi.string().hex().length(24).required(),
  foodItemId: Joi.string().hex().length(24).required()
});
