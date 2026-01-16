const withTimeout = (promise, ms, name) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${name} timeout`)), ms)
    )
  ]);

module.exports = { withTimeout };
