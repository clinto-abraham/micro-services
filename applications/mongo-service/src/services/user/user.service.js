"use strict";

const User = require("../../models/User");
const { generateUsername } = require('./user.util');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoErrorMapperService = require("../utils/mongoErrorMapper.service");


exports.createUser = async ({
  email,
  phone,
  passwordHash,
  name,
  location,
  roles,
  createdBy
}) => {
  try {
    // 1️⃣ Duplicate check
    const existing = await User.findOne({
      $or: [
        email ? { email } : null,
        phone ? { phone } : null
      ].filter(Boolean)
    });

    if (existing) {
      return {
        success: false,
        statusCode: 409,
        errorCode: "USER_ALREADY_EXISTS",
        message: "User already exists"
      };
    }

    // 2️⃣ Username generation
    const username = await generateUsername(name, email);

    // 3️⃣ Create
    const user = await User.create({
      authProvider: "LOCAL",
      email,
      phone,
      passwordHash,
      name,
      username,
      location,
      roles,
      registrationId: "C_1",
      createdBy
    });

    return {
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: { user }
    };

  } catch (err) {

    try {
    const mappedError = mongoErrorMapperService(err);

    if (mappedError) {
      return mappedError; // ✅ resolved promise
    }
  } catch (mapperErr) {
    console.error("ERROR_INSIDE_MONGO_MAPPER", mapperErr);
  }

  // ❌ only truly unknown errors reach here
  throw err;
  }

};


exports.getUserById = async (id) => {
  const user = await User.findOne({ _id: id, isActive: true });

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      errorCode: "USER_NOT_FOUND",
      message: "User not found"
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: "User fetched successfully",
    data: { user }
  };
};


exports.updateUser = async (id, update) => {
  const user = await User.findOneAndUpdate(
    { _id: id, isActive: true },
    update,
    { new: true }
  );

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      errorCode: "USER_NOT_FOUND",
      message: "User not found"
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: "User updated successfully",
    data: { user }
  };
};

exports.deactivateUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      errorCode: "USER_NOT_FOUND",
      message: "User not found"
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: "User deactivated successfully",
    data: { user }
  };
};

exports.bulkCreateUsers = async (users = []) => {
  if (!Array.isArray(users) || users.length === 0) {
    return {
      success: false,
      statusCode: 400,
      errorCode: "INVALID_PAYLOAD",
      message: "Users array is required"
    };
  }

  const created = [];

  for (const u of users) {
    const exists = await User.findOne({
      $or: [
        u.email ? { email: u.email } : null,
        u.phone ? { phone: u.phone } : null
      ].filter(Boolean)
    });

    if (!exists) {
      const username = await generateUsername(u.name, u.email);
      created.push({ ...u, username });
    }
  }

  const inserted = await User.insertMany(created, { ordered: false });

  return {
    success: true,
    statusCode: 201,
    message: "Users created successfully",
    data: {
      count: inserted.length,
      users: inserted
    }
  };
};

exports.deleteAllUsers = async () => {
  if (process.env.NODE_ENV === "production") {
    return {
      success: false,
      statusCode: 403,
      errorCode: "FORBIDDEN",
      message: "Operation not allowed in production"
    };
  }

  await User.deleteMany({});

  return {
    success: true,
    statusCode: 200,
    message: "All users deleted"
  };
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      errorCode: "USER_NOT_FOUND",
      message: "User not found"
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
    data: { user }
  };
};

exports.createUserFromProvider = async ({
  authProvider,
  providerId,
  email,
  name,
  phone,
  location,
  parentUserId = null,
  roles
}) => {
  // 1️⃣ Provider-level uniqueness
  let user = await User.findOne({ authProvider, providerId });

  if (user) {
    return {
      success: true,
      statusCode: 200,
      message: "User already exists",
      data: { user }
    };
  }

  // 2️⃣ Email-based account linking
  if (email) {
    user = await User.findOne({ email, authProvider: "LOCAL" });

    if (user) {
      user.authProvider = authProvider;
      user.providerId = providerId;
      await user.save();

      return {
        success: true,
        statusCode: 200,
        message: "User linked successfully",
        data: { user }
      };
    }
  }

  // 3️⃣ Create new provider user
  const username = await generateUsername(name, email);

  const newUser = await User.create({
    authProvider,
    providerId,
    email,
    name,
    username,
    phone,
    location,
    parentUserId,
    roles
  });

  return {
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: { user: newUser }
  };
};

exports.resetPassword = async (token, password) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresAt: { $gt: Date.now() },
    isActive: true
  });

  if (!user) throw new Error("Invalid or expired token");

  user.passwordHash = await bcrypt.hash(password, 12);
  user.passwordResetToken = null;
  user.passwordResetExpiresAt = null;
  user.passwordSetAt = new Date();

  await user.save();
};

exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (!user || !user.isActive) return;

  const token = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  user.passwordResetExpiresAt = Date.now() + 15 * 60 * 1000; // 15 mins

  await user.save();

  // sendEmail(user.email, resetLinkWith(token))
};

exports.setPassword = async (userId, password) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");
  if (!user.isActive) throw new Error("User is inactive");

  if (user.passwordHash) {
    throw new Error("Password already set. Use reset password.");
  }

  const hash = await bcrypt.hash(password, 12);

  user.passwordHash = hash;
  user.passwordSetAt = new Date();

  await user.save();
};
