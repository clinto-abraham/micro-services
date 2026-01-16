const Joi = require("joi");

const createSeatValidationSchema = Joi.object({
  eventId: Joi.string().required(),
  participantId: Joi.string().required()
});
  
module.exports = {
  createSeatValidationSchema
}