"use strict";

const Joi = require("joi");

/* ==========================
   COMMON / REUSABLE
========================== */

const objectId = Joi.string().length(24).hex();

const rolesSchema = Joi.array()
  .items(Joi.string().trim().uppercase())
  .min(1);

const envelopeSchema = Joi.object({
  payload: Joi.object().required(),

  // metadata: Joi.object({
  //   requestId: Joi.string().trim().required(),
  //   route: Joi.string().trim().optional(),
  //   timestamp: Joi.date().iso().required(),

  //   ip: Joi.string().ip({ version: ["ipv4", "ipv6"] }).optional(),
  //   userAgent: Joi.string().optional(),
  //   deviceId: Joi.string().optional(),

  //   userContext: Joi.object({
  //     userId: objectId.optional(),
  //     roles: rolesSchema.optional()
  //   }).optional()
  // }).required()
}).required();

module.exports = {
  envelopeSchema
};
