// jobs/deactivateUsers.job.js
const cron = require("node-cron");
const User = require("../models/User");

cron.schedule("0 0 31 12 *", async () => {
  console.log("Running yearly deactivation job");

  await User.updateMany(
    { isActive: true },
    { $set: { isActive: false } }
  );
});
