# micro-services.backend.ciyo.in
This is a combination of node and go-lang backend programms coupled around with each micro-services

# Microservices (gateway, user-service, api-service, ai-service, cron-service, mongo-service, notification-service)

## Quick local setup (native) — recommended for Mac M1

1. Install prerequisites (Homebrew): node, postgres, mongo, redis.
2. Start DBs:
   - Postgres: `brew services start postgresql`
   - MongoDB: `brew services start mongodb/brew/mongodb-community`
   - Redis: `brew services start redis`
3. For each service folder:
   ```bash
   cd gateway
   npm install
   # repeat for user-service, api-service, ai-service, cron-service
4. # Microservices Application 

Ports:
- API-Gateway: 2000
- User (Postgres): 3000
- Data (Mongo): 4444
- AI: 5000
- WebSocket: 6000
- Cron: 7000
- Payment: 8000
- Go-service: optional

Run locally (recommended on Mac M1 with Homebrew DBs):
5. Start DBs:
   - Postgres, MongoDB, Redis (via brew services)
6. Install dependencies per service:

   - `cd ai-service && npm i && \
     cd ../cron-service && npm i && \
     cd ../go-service && go mod tidy && \
     cd ../payment-service && npm i && \
     cd ../user-service && npm i && \
     cd ../api-service && npm i && \
     cd ../gateway && npm i && \
     cd ../websocket-service && npm i && \
     cd ..`

7. Start with PM2:
   - `cd infra && pm2 start ecosystem.config.js`
8. Check health endpoints:
   - `curl http://localhost:2000/health`, etc.

9. Notes:
- Services validate internal token header `X-Internal-Token` signed with `SERVICE_JWT_SECRET`.
- AI service supports OpenAI and local LLM.
- WebSocket service uses Socket.IO.
10. `chmod +x ./start-all.sh`
    `./start-all.sh`
11. Backend api link: https://happier-bertie-scratchless.ngrok-free.dev/

12. `pm2 stop all`
    `pm2 delete all`
    `pm2 start ecosystem.config.js --env production`
    `pm2 save`

| Requirement         | SQL (Postgres/MySQL) | MongoDB |
| ------------------- | -------------------- | ------- |
| Financial data      | ✅ REQUIRED           | ❌       |
| Payments            | ✅                    | ❌       |
| Transactions        | ✅                    | ❌       |
| User auth           | ✅                    | ❌       |
| Strong consistency  | ✅                    | ❌       |
| Relations & joins   | ✅                    | ❌       |
| Auditing            | ✅                    | ❌       |
| Schema flexibility  | ❌                    | ✅       |
| Logs / events       | ❌                    | ✅       |
| User activity       | ❌                    | ✅       |
| Notifications       | ❌                    | ✅       |
| Metadata            | ❌                    | ✅       |
| Rapid schema change | ❌                    | ✅       |

13. PM2 Commands:
pm2 start ecosystem.config.js --only api-gateway --env production
pm2 start ecosystem.config.js --only sql-service --env production
pm2 start ecosystem.config.js --only mongo-service --env production
pm2 start ecosystem.config.js --only ai-service --env production
pm2 start ecosystem.config.js --only websocket-service --env production
pm2 start ecosystem.config.js --only cron-service --env production
pm2 start ecosystem.config.js --only payment-service --env production
pm2 start ecosystem.config.js --only mail-service --env production
pm2 start ecosystem.config.js --only notification-service --env production


api-gateway
sql-service
mongo-service
ai-service
websocket-service
cron-service
payment-service
mail-service
notification-service

14. Creating new files and scaffolding from scratch for testing purpose.
    ls -l infra/create_microservices_structure.sh
    chmod +x infra/create_microservices_structure.sh
    ./infra/create_microservices_structure.sh
