"use strict";
require("./src/configs/env");

const app = require("./src/app");
const sequelize = require("./src/db/sequelize");

const PORT = process.env.PORT || 3000;


const server = app.listen(PORT, () => {
  console.log(`SQL service listening on port ${PORT}`);
});

process.on("unhandledRejection", async (err) => {
  console.log("unhandledRejection received. Shutting down sequelize postgres database...");
  await sequelize.close();
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down sequelize postgres database...");
  await sequelize.close();
  console.log("Shutting down server...");
  server.close(() => process.exit(0));
});
