const Joi = require("joi");

const createParticipantValidationSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  dateOfBirth: Joi.date().required(),
  age: Joi.number().min(5).required(),

  relationshipToOwner: Joi.string()
    .valid("SELF", "SPOUSE", "CHILD", "PARENT", "OTHER")
    .default("SELF"),

  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),

  governmentId: Joi.object({
    idType: Joi.string()
      .valid("AADHAR", "PASSPORT", "SSN", "OTHER")
      .required(),
    idNumber: Joi.string().required()
  }).optional(),

  location: Joi.object({
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string()
  }).optional(),

  events: Joi.array().items(
    Joi.object({
      eventId: Joi.string().required()
    })
  )
});

module.exports = {createParticipantValidationSchema}