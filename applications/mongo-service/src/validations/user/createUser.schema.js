"use strict";
const Joi = require("joi");

module.exports = Joi.object({
  authProvider: Joi.string()
    .valid("LOCAL", "GOOGLE", "APPLE", "FACEBOOK")
    .required(),

  providerId: Joi.when("authProvider", {
    is: "LOCAL",
    then: Joi.forbidden(),
    otherwise: Joi.string().required()
  }),

  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),

  passwordHash: Joi.when("authProvider", {
    is: "LOCAL",
    then: Joi.string().min(60).required(),
    otherwise: Joi.forbidden()
  }),

  name: Joi.string().min(2).required(),

  location: Joi.object({
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional(),

  parentUserId: Joi.string().hex().length(24).optional(),

  roles: Joi.array().items(
    Joi.string().valid(
      "OWNER",
      "ADMIN",
      "HOST",
      "VOLUNTEER",
      "CORE_TEAM",
      "PARTICIPANTS"
    )
  ).default(["PARTICIPANTS"]).optional(),
  
  createdBy: Joi.string().min(2).required(),
});
