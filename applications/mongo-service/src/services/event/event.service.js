"use strict";

const Event = require("../../models/Event");
const mongoErrorMapperService = require("../utils/mongoErrorMapper.service");
const { calculateNumberOfDays } = require("../utils/util.service");

exports.createEvent = async ({
  eventTitle,
  startDate,
  endDate,
  venueName,
  location,
  createdBy,
  ...rest
}) => {
  try {
    /**
     * 1️⃣ Duplicate check
     * Same event title + startDate + venue
     */
    const existing = await Event.findOne({
      eventTitle,
      startDate,
      venueName
    });

    if (existing) {
      return {
        success: false,
        statusCode: 409,
        errorCode: "EVENT_ALREADY_EXISTS",
        message: "Event already exists for the given date and venue"
      };
    }

    /**
     * 2️⃣ Create Event
     */
    const event = await Event.create({
      eventTitle,
      startDate,
      endDate,
      numberOfDays: calculateNumberOfDays(startDate, endDate),
      venueName,
      location,
      createdBy,
      lastUpdatedBy: createdBy,
      ...rest
    });

    return {
      success: true,
      statusCode: 201,
      message: "Event created successfully",
      data: { event }
    };

  } catch (err) {
    const mappedError = mongoErrorMapperService(err);

    if (mappedError) {
      return mappedError; // controlled response
    }

    throw err; // unexpected
  }
};

/**
 * GET ALL EVENTS
 */
exports.getEvents = async ({ status, city }) => {
  try {
    const filter = {};

    if (status) filter.status = status;
    if (city) filter["location.city"] = city;

    const events = await Event.find(filter).sort({ startDate: 1 });

    return {
      success: true,
      statusCode: 200,
      data: { events }
    };

  } catch (err) {
    throw err;
  }
};

/**
 * GET EVENT BY ID
 */
exports.getEventById = async ({ eventId }) => {
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return {
        success: false,
        statusCode: 404,
        errorCode: "EVENT_NOT_FOUND",
        message: "Event not found"
      };
    }

    return {
      success: true,
      statusCode: 200,
      data: { event }
    };

  } catch (err) {
    const mappedError = mongoErrorMapperService(err);
    if (mappedError) return mappedError;
    throw err;
  }
};

/**
 * UPDATE EVENT
 */
exports.updateEvent = async ({ eventId, updatePayload, userId }) => {
  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        ...updatePayload,
        lastUpdatedBy: userId
      },
      { new: true }
    );

    if (!event) {
      return {
        success: false,
        statusCode: 404,
        errorCode: "EVENT_NOT_FOUND",
        message: "Event not found"
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Event updated successfully",
      data: { event }
    };

  } catch (err) {
    const mappedError = mongoErrorMapperService(err);
    if (mappedError) return mappedError;
    throw err;
  }
};

/**
 * DELETE EVENT (Soft delete via isActive)
 */
exports.deleteEvent = async ({ eventId, userId }) => {
  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        isActive: false,
        lastUpdatedBy: userId
      },
      { new: true }
    );

    if (!event) {
      return {
        success: false,
        statusCode: 404,
        errorCode: "EVENT_NOT_FOUND",
        message: "Event not found"
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Event deleted successfully"
    };

  } catch (err) {
    const mappedError = mongoErrorMapperService(err);
    if (mappedError) return mappedError;
    throw err;
  }
};
