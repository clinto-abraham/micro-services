"use strict";

const { postgresDatabaseConnectionCheck } = require("../configs/sequelize");

module.exports = async (req, res, next) => {
  try {
    // ping DB, but do NOT manage opening/closing
    await postgresDatabaseConnectionCheck();
    next();
  } catch (err) {
    next(err);
  }
};
