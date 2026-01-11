"use strict";

const sequelize = require("../../../db/sequelize");

module.exports = async () => {
  try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  return {
      name: "database",
      type: "postgres",
      status: "UP"
    };
} catch (err) {
  console.error('Unable to connect to the database:', err);
  return {
      name: "database",
      type: "postgres",
      status: "DOWN",
      error: err.message
    };
}
};



// // Mongo example
// const mongoose = require("../../db/mongoose");

// module.exports = async () => ({
//   name: "database",
//   type: "mongo",
//   status: mongoose.connection.readyState === 1 ? "UP" : "DOWN"
// });
