"use strict";

const Joi = require("joi");

module.exports = Joi.object({
  payload: Joi.object().required(),
  // metadata: Joi.object().optional()
});
