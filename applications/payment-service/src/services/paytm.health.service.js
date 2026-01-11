"use strict";

const axios = require("axios");

const checkPaytm = async () => {
  try {
    await axios.get(
      "https://securegw.paytm.in/merchant-status",
      { timeout: 3000 }
    );
    return "UP";
  } catch {
    return "DOWN";
  }
};

module.exports = { checkPaytm };
