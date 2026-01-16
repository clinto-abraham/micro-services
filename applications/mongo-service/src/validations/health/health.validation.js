"use strict";

const Joi = require("joi");

const healthSchema = Joi.object({
  timestamp: Joi.string().isoDate().required(),
  state: Joi.string().required(),
  live: Joi.object({
    status: Joi.string().required()
  }).required(),
  ready: Joi.object({
    status: Joi.string().required(),
    dependencies: Joi.array().required()
  }).required()
});

exports.validateHealth = payload => {
  const { error } = healthSchema.validate(payload);
  return {
    valid: !error,
    error
  };
};
