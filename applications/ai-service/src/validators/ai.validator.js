"use strict";

const Joi = require("joi");

const prompt = Joi.string().min(1).max(20_000).required();

exports.chatgptSchema = Joi.object({
  prompt
});

exports.geminiSchema = Joi.object({
  prompt
});

exports.compareSchema = Joi.object({
  prompt,
  providers: Joi.array()
    .items(Joi.string().valid("gemini", "openai", "local"))
    .min(2)
    .required()
});


// "use strict";

// const Joi = require("joi");

// /**
//  * Allowed AI providers
//  * (single source of truth)
//  */
// const PROVIDERS = ["gemini", "openai", "local"];

// /**
//  * Chat request validation
//  */
// const chatSchema = Joi.object({
//   prompt: Joi.string()
//     .min(1)
//     .max(20_000)
//     .required(),

//   mode: Joi.string()
//     .valid("compare", "multi", "local")
//     .optional(),

//   providers: Joi.array()
//     .items(Joi.string().valid(...PROVIDERS))
//     .min(1)
//     .when("mode", {
//       is: Joi.exist(),
//       then: Joi.required(),
//       otherwise: Joi.optional()
//     })
// });

// module.exports = {
//   chatSchema,
//   PROVIDERS
// };
