"use strict";

const bookingService = require("../../services/seatBooking/booking.service");
const response = require("../../helpers/response");

class BookingController {
  
  async createBooking(req, res, next) {
    try {
      const booking = await bookingService.createBooking(req.body);
      return response.success(res, "Seat booked successfully", booking);
    } catch (error) {
      next(error);
    }
  }

  async getAllBookings(req, res, next) {
    try {
      const bookings = await bookingService.getAllBookings();
      return response.success(res, "All bookings fetched", bookings);
    } catch (error) {
      next(error);
    }
  }

  async getBookingById(req, res, next) {
    try {
      const booking = await bookingService.getBookingById(req.params.id);
      if (!booking) {
        return response.error(res, "Booking not found", 404);
      }
      return response.success(res, "Booking found", booking);
    } catch (error) {
      next(error);
    }
  }

  async deleteBooking(req, res, next) {
    try {
      const deleted = await bookingService.deleteBooking(req.params.id);
      if (!deleted) {
        return response.error(res, "Booking not found", 404);
      }
      return response.success(res, "Booking deleted", deleted);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new BookingController();

