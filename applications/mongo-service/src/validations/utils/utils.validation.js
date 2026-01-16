"use strict";

const Joi = require("joi");
const mongoose = require("mongoose");

/**
 * Common ObjectId validator
 */
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

module.exports = {
  objectId
}
