"use strict";

const axios = require("axios");

const checkICICI = async () => {
  try {
    await axios.get(
      "https://api.icicibank.com/health",
      { timeout: 3000 }
    );
    return "UP";
  } catch {
    return "DOWN";
  }
};

module.exports = { checkICICI };
