const { 
  createUserSchema, 
  createUserFromProviderSchema,
  getUserByIdSchema,
  updateUserSchema,
  deactivateUserSchema,
  deleteUserSchema,
  bulkCreateUsersSchema 
} = require("./user.schema");

module.exports = {
  createUser: require("./createUser.schema"),
  createUserSchema, 
  createUserFromProviderSchema,
  getUserByIdSchema,
  updateUserSchema,
  deactivateUserSchema,
  deleteUserSchema,
  bulkCreateUsersSchema 
};

  