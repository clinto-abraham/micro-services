"use strict";
const Joi = require("joi");

const { adminMetaSchema, coreTeamSchema, speakerSchema, coordinatorSchema, locationSchema } = require("./event.validation");

module.exports = Joi.object({
  eventTitle: Joi.string().min(3).max(200).required(),
  eventSubTitle: Joi.string().allow("", null),
  eventDescription: Joi.string().required(),

  venueName: Joi.string().required(),
  venueImages: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .required(),

  eventFee: Joi.number().min(0).default(0),
  hallRent: Joi.number().min(0).default(0),

  location: locationSchema.required(),

  coordinator: coordinatorSchema.required(),

  speakers: Joi.array().items(speakerSchema).default([]),

  coreTeam: Joi.array().items(coreTeamSchema).default([]),

  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),

  numberOfDays: Joi.number().min(1).optional(),

  followUpLink: Joi.string().uri().allow("", null),
  remarks: Joi.string().allow("", null),

  adminMeta: adminMetaSchema.optional(),

  status: Joi.string()
    .valid("DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED")
    .default("DRAFT"),

  isActive: Joi.boolean().default(true)
});