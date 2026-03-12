#!/usr/bin/env bash

# echo "🧹 Freeing ports..."

# node ./free-port.js 1111
# node ./free-port.js 2000
# node ./free-port.js 3000
# node ./free-port.js 4444
# node ./free-port.js 5550
# node ./free-port.js 6000
# node ./free-port.js 7000
# node ./free-port.js 8000
# node ./free-port.js 9000

# echo ""
# echo "📦 Installing dependencies for microservices..."

echo "🧹 Freeing ports..."

PORTS=(5000 5001 5002 5003 5004 5005 5006 5007 5008 5009 1111 2000 3000 4444 5550 5555 6000 7000 8000 9000)

for PORT in "${PORTS[@]}"
do
  echo "Freeing port $PORT"
  node ../../infra/free-port.js $PORT
done


BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APPS_DIR="$BASE_DIR/applications"

for service in "$APPS_DIR"/*; do
  if [ -f "$service/package.json" ]; then
    SERVICE_NAME=$(basename "$service")
    echo "Installing deps for $SERVICE_NAME"

    cd "$service"

    # install only if node_modules missing
    if [ ! -d "node_modules" ]; then
      npm install --silent
    fi
  fi
done

cd "$BASE_DIR/infra"

echo "✅ Dependency check complete"

set -e

echo "🚀 Starting micro-services one by one via PM2 (production)..."

# Check if PM2 exists
if ! command -v pm2 &> /dev/null
then
  echo "❌ PM2 is not installed. Install using: sudo npm install -g pm2"
  exit 1
fi

# Optional: show PM2 version
echo "ℹ️ PM2 version: $(pm2 -v)"

# Start services one by one (isolated)
pm2 start ./ecosystem.config.js --only api-gateway --env production
sleep 2

pm2 start ./ecosystem.config.js --only sql-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only mongo-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only ai-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only websocket-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only cron-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only payment-service --env production
sleep 2

pm2 start ./ecosystem.config.js --only mail-service --env production

# Save PM2 process list for restart on reboot
pm2 save

# Show final status
pm2 status

echo "✅ All services started successfully in production mode"
