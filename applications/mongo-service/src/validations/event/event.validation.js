"use strict";

const Joi = require("joi");

const locationSchema = Joi.object({
  address: Joi.string().allow("", null),
  city: Joi.string().allow("", null),
  state: Joi.string().allow("", null),
  country: Joi.string().allow("", null),
  googleMapsLink: Joi.string().uri().allow("", null)
});

const coordinatorSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().allow("", null),
  email: Joi.string().email().allow("", null)
});

const speakerSchema = Joi.object({
  name: Joi.string().required(),
  designation: Joi.string().allow("", null)
});

const coreTeamSchema = Joi.object({
  name: Joi.string().required(),
  contact: Joi.string().allow("", null)
});

const adminMetaSchema = Joi.object({
  policeClearanceLink: Joi.string().uri().allow("", null),
  localAuthorityPermissionLink: Joi.string().uri().allow("", null),
  fireSafetyCertificateLink: Joi.string().uri().allow("", null),
  notes: Joi.string().allow("", null)
});

module.exports = {
  locationSchema,
  coordinatorSchema,
  speakerSchema,
  coreTeamSchema,
  adminMetaSchema 
}
