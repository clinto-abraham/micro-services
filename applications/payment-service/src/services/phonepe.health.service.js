"use strict";

const axios = require("axios");

const checkPhonePe = async () => {
  try {
    await axios.get(
      "https://api.phonepe.com/apis/merchant/status",
      { timeout: 3000 }
    );
    return "UP";
  } catch {
    return "DOWN";
  }
};

module.exports = { checkPhonePe };
