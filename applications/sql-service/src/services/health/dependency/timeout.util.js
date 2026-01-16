"use strict";

const withTimeout = (promise, ms, name) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`${name} timeout after ${ms}ms`)),
        ms
      )
    )
  ]);

module.exports = {
  withTimeout
};
