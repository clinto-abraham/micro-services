"use strict";

const axios = require("axios");

const SERVICES = [
  { name: "sql-microservice", port: 3000 },
  { name: "mongo-microservice", port: 4000 },
  { name: "ai-microservice", port: 5550 },
  { name: "websocket-microservice", port: 6000 },
  { name: "cron-microservice", port: 7000 },
  { name: "payment-microservice", port: 8000 },
  { name: "mail-microservice", port: 9000 }
];

const aggregateHealth = async () => {
  const checks = await Promise.allSettled(
    SERVICES.map(s =>
      axios.get(`http://127.0.0.1:${s.port}/health`, { timeout: 2500 })
    )
  );

  checks.map((r, i) =>{
    console.log(r, "r")
       console.log(i, "i")
  }
    
      )
  return checks.map((r, i) =>
    r.status === "fulfilled"
      ? r.value.data
      : {
          service: SERVICES[i].name,
          status: "DOWN",
          checks: { http: "DOWN" }
        }
  );
};

module.exports = { aggregateHealth };
