"use strict";

const Seat = require("../../models/Seat");
const Booking = require("../../models/booking");
const redis = require("../../helpers/redis");   // optional if you use Redis
const AppError = require("../../utils/AppError"); // optional custom error class

/**
 * Create a new booking
 */
const createBooking = async (data) => {
  const { seatNumber, row, userId, showId, price } = data;

  // Find seat
  const seat = await Seat.findOne({ seatNumber, row });
  if (!seat) {
    throw new AppError("Seat not found", 404);
  }

  // Prevent double booking
  if (seat.status === "booked") {
    throw new AppError("Seat already booked", 409);
  }

  // Update seat status
  seat.status = "booked";
  seat.booker = userId || "unknown-user";
  await seat.save();

  // Create booking record
  const booking = await Booking.create({
    seatId: seat._id,
    userId,
    showId,
    price
  });

  // Clear cached seat list
  if (redis) redis.del("seats:all");

  return { seat, booking };
};

/**
 * Get all bookings
 */
const getAllBookings = async () => {
  return Booking.find()
    .populate("seatId")
    .sort({ createdAt: -1 })
    .lean();
};

/**
 * Get booking by ID
 */
const getBookingById = async (id) => {
  return Booking.findById(id)
    .populate("seatId")
    .lean();
};

/**
 * Delete booking & free seat
 */
const deleteBooking = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  // Free the seat
  await Seat.findByIdAndUpdate(booking.seatId, {
    status: "free",
    booker: null
  });

  // Delete booking
  const deleted = await Booking.findByIdAndDelete(id);

  // Clear cache
  if (redis) redis.del("seats:all");

  return deleted;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking
};
