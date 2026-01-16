"use strict";

/**
 * Calculate number of days between two dates (inclusive)
 * Example:
 * 2026-01-01 to 2026-01-01 → 1 day
 * 2026-01-01 to 2026-01-03 → 3 days
 */
function calculateNumberOfDays(startDate, endDate) {
  if (!startDate || !endDate) {
    throw new Error("startDate and endDate are required");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Invalid date format");
  }

  if (end < start) {
    throw new Error("endDate cannot be earlier than startDate");
  }

  // Normalize to midnight to avoid timezone issues
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Inclusive count
  return diffDays + 1;
};

module.exports = {
    calculateNumberOfDays
}