"use strict";

const axios = require("axios");

const checkGooglePay = async () => {
  try {
    await axios.get(
      "https://payments.google.com/status",
      { timeout: 3000 }
    );
    return "UP";
  } catch {
    return "DOWN";
  }
};

module.exports = { checkGooglePay };
