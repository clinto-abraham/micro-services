"use strict";

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(process.cwd(), "logs");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const levels = {
  info:  { label: "INFO",  color: "\x1b[34m" }, // blue
  warn:  { label: "WARN",  color: "\x1b[33m" }, // yellow
  error: { label: "ERROR", color: "\x1b[31m" }, // red
  debug: { label: "DEBUG", color: "\x1b[36m" }  // cyan
};

function format(level, messages) {
  const time = new Date().toISOString();
  return `[${time}] [${levels[level].label}] ${messages.join(" ")}`;
}

function writeToFile(message) {
  const file = path.join(LOG_DIR, "app.log");
  fs.appendFile(file, message + "\n", () => {});
}

function log(level, ...messages) {
  const msg = format(level, messages);

  console.log(`${levels[level].color}${msg}\x1b[0m`);
  writeToFile(msg);
}

module.exports = {
  info:  (...msg) => log("info", ...msg),
  warn:  (...msg) => log("warn", ...msg),
  error: (...msg) => log("error", ...msg),
  debug: (...msg) => {
    if (process.env.NODE_ENV !== "production") {
      log("debug", ...msg);
    }
  }
};
