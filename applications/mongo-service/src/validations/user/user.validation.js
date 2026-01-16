"use strict";

const Joi = require("joi");

exports.createUser = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  location: Joi.object({
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional(),
  roles: Joi.array().items(Joi.string()).default(["CUSTOMER"])
});

exports.userIdParam = Joi.object({
  id: Joi.string().hex().length(24).required()
});
