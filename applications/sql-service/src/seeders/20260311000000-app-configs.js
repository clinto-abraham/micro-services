"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const now = new Date();
    await queryInterface.bulkInsert("AppConfigs", [
      {
        id: uuidv4(),
        nameOfApp: "nmg_nextjs_streaming_platform",
        connectedBackendName: "nmg_streaming_backend",
        connectedBackendPort: 7777,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        nameOfApp: "nmg_nextjs_event_management_app",
        connectedBackendName: "nmg_streaming_backend",
        connectedBackendPort: 7777,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("AppConfigs", null, {});
  },
};
