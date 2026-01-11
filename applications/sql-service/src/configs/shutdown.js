"use strict";
async function gracefulShutdown(server, closeFns = []) {
  console.log("\n🛑 Graceful shutdown initiated...");

  try {
    console.log("🔹 Stopping HTTP server...");
    await new Promise((resolve, reject) => {
      server.close(err => (err ? reject(err) : resolve()));
    });

    for (const fn of closeFns) {
      try {
        await fn();
      } catch (err) {
        console.error("❌ Error closing resource:", err);
      }
    }

    console.log("✅ All resources closed. Exiting.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Graceful shutdown failed:", err);
    process.exit(1);
  }
}

module.exports = gracefulShutdown;
