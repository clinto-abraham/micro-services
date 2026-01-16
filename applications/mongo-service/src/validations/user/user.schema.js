"use strict";

const Joi = require("joi");

/* ==========================
   COMMON
========================== */

const objectId = Joi.string().length(24).hex();

const rolesSchema = Joi.array()
  .items(Joi.string().trim().uppercase())
  .min(1);

/* ==========================
   CREATE USER
========================== */

const createUserSchema = Joi.object({
  authProvider: Joi.string()
    .valid("LOCAL", "GOOGLE", "APPLE", "FACEBOOK")
    .optional(),

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


// Joi.object({
//   name: Joi.string().trim().min(2).max(100).required(),
//   email: Joi.string().email().lowercase().required(),
//   phone: Joi.string().trim().min(8).max(20).required(),
//   passwordHash: Joi.string().min(20).required(),
//   location: Joi.string().trim().optional(),
//   roles: rolesSchema.required(),
//   createdBy: Joi.string().trim().min(2).max(100).required(),
// });

/* ==========================
   CREATE USER FROM PROVIDER
========================== */

const createUserFromProviderSchema = Joi.object({
  provider: Joi.string().trim().lowercase().required(),
  providerUserId: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().required(),
  name: Joi.string().trim().min(2).required(),
  roles: rolesSchema.required()
});

/* ==========================
   GET USER BY ID
========================== */

const getUserByIdSchema = Joi.object({
  userId: objectId.required()
});

/* ==========================
   UPDATE USER
========================== */

const updateUserSchema = Joi.object({
  userId: objectId.required(),
  updateData: Joi.object({
    name: Joi.string().trim().min(2).max(100).optional(),
    email: Joi.string().email().lowercase().optional(),
    phone: Joi.string().trim().min(8).max(20).optional(),
    location: Joi.string().trim().optional(),
    roles: rolesSchema.optional(),
    isActive: Joi.boolean().optional()
  })
    .min(1)
    .required()
});

/* ==========================
   DEACTIVATE USER
========================== */

const deactivateUserSchema = Joi.object({
  userId: objectId.required()
});

/* ==========================
   DELETE USER
========================== */

const deleteUserSchema = Joi.object({
  userId: objectId.required()
});

/* ==========================
   BULK CREATE USERS
========================== */

const bulkCreateUsersSchema = Joi.object({
  users: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().min(2).required(),
        email: Joi.string().email().lowercase().required(),
        phone: Joi.string().trim().min(8).max(20).required(),
        passwordHash: Joi.string().min(20).required(),
        location: Joi.string().trim().optional(),
        roles: rolesSchema.required()
      })
    )
    .min(1)
    .max(500)
    .required()
});

module.exports = {
  createUserSchema,
  createUserFromProviderSchema,
  getUserByIdSchema,
  updateUserSchema,
  deactivateUserSchema,
  deleteUserSchema,
  bulkCreateUsersSchema
};
