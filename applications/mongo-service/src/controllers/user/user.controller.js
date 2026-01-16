"use strict";

const userService = require("../../services/user/user.service");
const sendResponse = require("../../utils/sendResponse");

exports.createUser = async (req, res) => {
  const { payload, requestId } = req.body;
  const { name, email, phone, passwordHash, location, roles } = payload;

  try {
    const result = await userService.createUser({
      email,
      phone,
      passwordHash,
      name,
      location,
      roles
    });

    return sendResponse({ res, result, requestId });

  } catch (err) {
    // Truly unexpected errors only
    console.log(err, "reached catch block")
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { payload, requestId } = req.body;
  const { id } = payload;

  try {
    const result = await userService.deleteUser(id);

    return sendResponse({ res, result, requestId });

  } catch (err) {
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};

exports.createUserFromProvider = async (req, res) => {
  const { payload, requestId } = req.body;
  const {
    authProvider,
    providerId,
    email,
    name,
    phone,
    location,
    parentUserId,
    roles
  } = payload;

  try {
    const result = await userService.createUserFromProvider({
      authProvider,
      providerId,
      email,
      name,
      phone,
      location,
      parentUserId,
      roles
    });

    return sendResponse({ res, result, requestId });

  } catch (err) {
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};


/**
 * GET USER BY ID
 */
exports.getUserById = async (req, res) => {
  const { payload, requestId } = req.body;
  const { userId } = payload;

  try {
    const result = await userService.getUserById(userId);

    return sendResponse({ res, result, requestId });
  } catch (err) {
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};


/**
 * UPDATE USER
 */
exports.updateUser = async (req, res) => {
  const { payload, requestId } = req.body;
  const { userId, updateData } = payload;

  try {
    const result = await userService.updateUser(userId, updateData);

    return sendResponse({ res, result, requestId });
  } catch (err) {
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};


/**
 * DEACTIVATE USER (SOFT DELETE)
 */
exports.deactivateUser = async (req, res) => {
  const { payload, requestId } = req.body;
  const { userId } = payload;

  try {
    const result = await userService.deactivateUser(userId);

    return sendResponse({ res, result, requestId });
  } catch (err) {
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};


/**
 * BULK CREATE USERS
 */
exports.bulkCreateUsers = async (req, res) => {
  const { payload, requestId } = req.body;
  const { users } = payload; // array of user objects

  try {
    const result = await userService.bulkCreateUsers(users);

    return sendResponse({ res, result, requestId });
  } catch (err) {
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};


/**
 * DELETE ALL USERS (HARD DELETE – ADMIN ONLY)
 */
exports.deleteAllUsers = async (req, res) => {
  const { requestId } = req.body;

  try {
    const result = await userService.deleteAllUsers();

    return sendResponse({ res, result, requestId });
  } catch (err) {
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const { metadata } = req.body;
  const requestId = metadata?.requestId;

  try {
    const result = await userService.getAllUsers();

    return sendResponse({ res, result, requestId });
  } catch (err) {
    return sendResponse({
      res,
      requestId,
      result: {
        success: false,
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  await authService.resetPassword(token, newPassword);

  res.json({ message: "Password reset successful" });
};

