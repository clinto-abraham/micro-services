"use strict";

module.exports = function mongoErrorMapper(err) {
  const timestamp = new Date().toISOString();

  /**
   * 1️⃣ Duplicate key error (E11000)
   */
  if (err?.code === 11000 && err?.keyPattern) {
    const fields = Object.keys(err.keyPattern);

    return {
      success: false,
      errorCode: `DUPLICATE_${fields.join("_").toUpperCase()}`,
      message: "Duplicate value violation",
      meta: {
        timestamp,
        fields
      }
    };
  }

  /**
   * 2️⃣ Mongoose validation errors (REAL detection)
   * Covers: required, enum, min/max, custom validators
   */
  if (
    err &&
    typeof err === "object" &&
    err.errors &&
    typeof err.errors === "object" &&
    Object.keys(err.errors).length > 0
  ) {
    const errors = Object.keys(err.errors).map((field) => {
      const e = err.errors[field];

      return {
        field,
        type: e.kind || e.properties?.type || "validation",
        message: e.message || e.properties?.message || "Validation failed"
      };
    });

    return {
      success: false,
      errorCode: "VALIDATION_ERROR",
      message: "Validation failed",
      meta: {
        timestamp,
        errors
      }
    };
  }

  /**
   * 3️⃣ CastError (invalid ObjectId)
   */
  if (err?.name === "CastError") {
    return {
      success: false,
      errorCode: "INVALID_IDENTIFIER",
      message: `Invalid ${err.path}`,
      meta: {
        timestamp
      }
    };
  }

  /**
   * ❌ Not mappable
   */
  return null;
};
