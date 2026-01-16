"use strict";

const Joi = require("joi");
const { objectId } = require("../utils/utils.validation");

module.exports = Joi.object({
  id: objectId.required()
});
