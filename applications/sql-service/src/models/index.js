"use strict";

const fs = require("fs");
const path = require("path");
const SequelizeLib = require("sequelize");
const sequelize = require("../db/sequelize"); // import singleton

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file.endsWith(".js")
    );
  })
  .forEach((file) => {
    const modelFactory = require(path.join(__dirname, file));

    if (typeof modelFactory !== "function") {
      throw new Error(
        `Model file ${file} does not export a function`
      );
    }

    const model = modelFactory(sequelize, SequelizeLib.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = SequelizeLib;

module.exports = db;


// const sequelize = new SequelizeLib(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

// const sequelize = new SequelizeLib(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

// const config = require(path.join(__dirname, "../configs/database.js"))[env];

// const env = process.env.NODE_ENV || "development";