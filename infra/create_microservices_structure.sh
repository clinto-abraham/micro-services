#!/bin/bash

# -----------------------------
# Pretty Log Helpers
# -----------------------------
log_check() {
  echo "🔍 Checking $1: $2"
}

log_skip() {
  echo "⚠️  Already exists → Skipping"
  echo ""
}

log_create_start() {
  echo "📂 Creating $1..."
}

log_create_done() {
  echo "✔️  DONE! Created $1 → $2"
  echo ""
}

log_error() {
  echo "❌ FAILED to create $1 → $2"
  echo ""
}

# -----------------------------
# Create Folder (with detailed logs)
# -----------------------------
create_folder() {
  local folder="$1"

  log_check "folder" "$folder"

  if [ -d "$folder" ]; then
    log_skip
  else
    log_create_start "folder"
    if mkdir -p "$folder"; then
      log_create_done "folder" "$folder"
    else
      log_error "folder" "$folder"
    fi
  fi
}

# -----------------------------
# Create File (with detailed logs)
# -----------------------------
create_file() {
  local file="$1"

  log_check "file" "$file"

  if [ -f "$file" ]; then
    log_skip
  else
    log_create_start "file"
    if touch "$file"; then
      log_create_done "file" "$file"
    else
      log_error "file" "$file"
    fi
  fi
}


# -----------------------------
# Base Structure
# -----------------------------
ROOT="applications"

echo "📁 Creating microservices structure..."
create_folder "$ROOT"

# -----------------------------
# Gateway Service (PORT 2000)
# -----------------------------
create_folder "$ROOT/api-gateway"
create_file   "$ROOT/api-gateway/package.json"
create_file   "$ROOT/api-gateway/index.js"

# Security folder
create_folder "$ROOT/api-gateway/security"
create_file   "$ROOT/api-gateway/security/spikeProtector.js"
create_file   "$ROOT/api-gateway/security/aiTrafficGuard.js"
create_file   "$ROOT/api-gateway/security/rateLimiter.js"

# Middleware folder
create_folder "$ROOT/api-gateway/middleware"
create_file   "$ROOT/api-gateway/middleware/internalAuth.js"

create_file   "$ROOT/api-gateway/.env.example"


# -----------------------------
# User Service (PORT 3000)
# -----------------------------
create_folder "$ROOT/user-service"
create_file   "$ROOT/user-service/package.json"
create_file   "$ROOT/user-service/index.js"
create_file   "$ROOT/user-service/db.js"
create_file   "$ROOT/user-service/.env.example"

# -----------------------------
# API Service (Mongo) (PORT 4000)
# -----------------------------

ROOT="applications"
SERVICE="mongo-service"

echo "📁 Creating Mongo Express Service structure..."

create_folder "$ROOT"
create_folder "$ROOT/$SERVICE"

# Root Files
create_file "$ROOT/$SERVICE/server.js"
create_file "$ROOT/$SERVICE/package.json"
create_file "$ROOT/$SERVICE/.env.example"
create_file "$ROOT/$SERVICE/README.md"

# SRC
create_folder "$ROOT/$SERVICE/src"
create_file   "$ROOT/$SERVICE/src/app.js"

# DB
create_folder "$ROOT/$SERVICE/src/db"
create_file   "$ROOT/$SERVICE/src/db/mongo.js"

# Configs
create_folder "$ROOT/$SERVICE/src/configs"
create_file   "$ROOT/$SERVICE/src/configs/env.js"

# Models
create_folder "$ROOT/$SERVICE/src/models"

for model in \
  User BookingAccount Booking Participant Event EventDay \
  FoodItem ParticipantFood \
  StayLocation StayUnit StayDuration ParticipantStay \
  QRCode Payment
do
  create_file "$ROOT/$SERVICE/src/models/${model}.js"
done

# Controllers
create_folder "$ROOT/$SERVICE/src/controllers"

for ctrl in auth booking participant food stay scan payment
do
  create_file "$ROOT/$SERVICE/src/controllers/${ctrl}.controller.js"
done

# Services
create_folder "$ROOT/$SERVICE/src/services"

for service in auth pricing qr payment
do
  create_file "$ROOT/$SERVICE/src/services/${service}.service.js"
done

# Validations
create_folder "$ROOT/$SERVICE/src/validations"

for val in auth booking participant food stay payment
do
  create_file "$ROOT/$SERVICE/src/validations/${val}.validation.js"
done

# Commons
create_folder "$ROOT/$SERVICE/src/commons"
create_file "$ROOT/$SERVICE/src/commons/roles.js"
create_file "$ROOT/$SERVICE/src/commons/constants.js"

# Utils
create_folder "$ROOT/$SERVICE/src/utils"
create_file "$ROOT/$SERVICE/src/utils/hash.js"
create_file "$ROOT/$SERVICE/src/utils/jwt.js"
create_file "$ROOT/$SERVICE/src/utils/response.js"
create_file "$ROOT/$SERVICE/src/utils/date.js"

# Routes (Single File)
create_folder "$ROOT/$SERVICE/src/routes"
create_file   "$ROOT/$SERVICE/src/routes/index.js"

echo "🎉 Mongo Express service structure created successfully!"

# -----------------------------
# AI Service (PORT 5000)
# -----------------------------
create_folder "$ROOT/ai-service"
create_file   "$ROOT/ai-service/package.json"
create_file   "$ROOT/ai-service/index.js"

# AI logic files
create_file   "$ROOT/ai-service/chatgpt.js"
create_file   "$ROOT/ai-service/localLLM.js"
create_file   "$ROOT/ai-service/pubsub.js"

create_file   "$ROOT/ai-service/.env.example"


# -----------------------------
# WebSocket Service (PORT 6000)
# -----------------------------
create_folder "$ROOT/websocket-service"
create_file   "$ROOT/websocket-service/package.json"
create_file   "$ROOT/websocket-service/index.js"
create_file   "$ROOT/websocket-service/.env.example"


# -----------------------------
# Cron Service (PORT 7000)
# -----------------------------
create_folder "$ROOT/cron-service"
create_file   "$ROOT/cron-service/package.json"
create_file   "$ROOT/cron-service/index.js"
create_file   "$ROOT/cron-service/.env.example"


# -----------------------------
# Payment Service (PORT 8000)
# -----------------------------
create_folder "$ROOT/payment-service"
create_file   "$ROOT/payment-service/package.json"
create_file   "$ROOT/payment-service/index.js"
create_file   "$ROOT/payment-service/razorpay.js"
create_file   "$ROOT/payment-service/verifyWebhook.js"
create_file   "$ROOT/payment-service/.env.example"


# -----------------------------
# Go Service (Optional Microservice)
# -----------------------------
create_folder "$ROOT/go-service"

create_file   "$ROOT/go-service/go.mod"

create_folder "$ROOT/go-service/cmd/server"
create_file   "$ROOT/go-service/cmd/server/main.go"

create_folder "$ROOT/go-service/internal/config"
create_file   "$ROOT/go-service/internal/config/config.go"

create_folder "$ROOT/go-service/internal/database"
create_file   "$ROOT/go-service/internal/database/mongo.go"

create_folder "$ROOT/go-service/internal/models"
create_file   "$ROOT/go-service/internal/models/item.go"

create_file "$ROOT/go-service/.env.example"


# -----------------------------
# Infra Folder
# -----------------------------
create_folder "$ROOT/infra"
create_file   "$ROOT/infra/ecosystem.config.js"
create_file   "$ROOT/infra/start-all.sh"


# -----------------------------
# Root README File
# -----------------------------
create_file "$ROOT/README.md"

echo "🎉 Microservices architecture structure created successfully!"
