"use strict";

const Event = require("../../models/Event");
const User = require("../../models/User");
const { sendEventReminder } = require("../notification/notification.service");

exports.sendTwoDayReminders = async () => {
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

  const events = await Event.find({
    startDate: {
      $gte: twoDaysFromNow,
      $lt: new Date(twoDaysFromNow.getTime() + 86444400)
    }
  });

  for (const event of events) {
    const users = await User.find({ isActive: true });
    for (const user of users) {
      await sendEventReminder({ user, event });
    }
  }
};
