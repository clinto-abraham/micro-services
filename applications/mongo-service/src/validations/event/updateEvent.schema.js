"use strict";
const Joi = require("joi");

const { adminMetaSchema, coreTeamSchema, speakerSchema, coordinatorSchema, locationSchema } = require("./event.validation");

module.exports = Joi.object({
  eventTitle: Joi.string().min(3).max(200),
  eventSubTitle: Joi.string().allow("", null),
  eventDescription: Joi.string(),

  venueName: Joi.string(),
  venueImages: Joi.array().items(Joi.string().uri()).min(1),

  eventFee: Joi.number().min(0),
  hallRent: Joi.number().min(0),

  location: locationSchema,

  coordinator: coordinatorSchema,

  speakers: Joi.array().items(speakerSchema),
  coreTeam: Joi.array().items(coreTeamSchema),

  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")),

  numberOfDays: Joi.number().min(1),

  followUpLink: Joi.string().uri().allow("", null),
  remarks: Joi.string().allow("", null),

  adminMeta: adminMetaSchema,

  status: Joi.string().valid(
    "DRAFT",
    "PUBLISHED",
    "CANCELLED",
    "COMPLETED"
  ),

  isActive: Joi.boolean()
})
  .min(1); // at least one field must be updated
