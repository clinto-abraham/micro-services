#!/bin/bash

# -----------------------------
# Resolve Project Root
# -----------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# -----------------------------
# FLAGS
# -----------------------------
DRY_RUN=false

if [[ "$1" == "--dry-run" ]]; then
  DRY_RUN=true
fi

# -----------------------------
# Colors
# -----------------------------
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
RESET="\033[0m"

# -----------------------------
# Timestamp
# -----------------------------
timestamp() {
  date "+%Y-%m-%d %H:%M:%S"
}

# -----------------------------
# Logger Helpers
# -----------------------------
log_info() {
  echo -e "${BLUE}[$(timestamp)] 🔍 $1${RESET}"
}

log_success() {
  echo -e "${GREEN}[$(timestamp)] ✔️  $1${RESET}"
  echo ""
}

log_warn() {
  echo -e "${YELLOW}[$(timestamp)] ⚠️  $1${RESET}"
  echo ""
}

log_error() {
  echo -e "${RED}[$(timestamp)] ❌ $1${RESET}"
  echo ""
}

# -----------------------------
# Create Folder
# -----------------------------
create_folder() {
  local folder="$1"

  log_info "Checking folder: $folder"

  if [ -d "$folder" ]; then
    log_warn "Folder already exists → Skipping"
  else
    if $DRY_RUN; then
      log_warn "(DRY-RUN) Would create folder → $folder"
    else
      mkdir -p "$folder" \
        && log_success "Created folder → $folder" \
        || log_error "Failed to create folder → $folder"
    fi
  fi
}

# -----------------------------
# Create File
# -----------------------------
create_file() {
  local file="$1"

  log_info "Checking file: $file"

  if [ -f "$file" ]; then
    log_warn "File already exists → Skipping"
  else
    if $DRY_RUN; then
      log_warn "(DRY-RUN) Would create file → $file"
    else
      touch "$file" \
        && log_success "Created file → $file" \
        || log_error "Failed to create file → $file"
    fi
  fi
}


# -----------------------------
# Base Structure
# -----------------------------
PROJECT_ROOT="applications"

echo "📁 Creating microservices structure..."
create_folder "$PROJECT_ROOT"

# -----------------------------
# Gateway Service (PORT 2000)
# -----------------------------
create_folder "$PROJECT_ROOT/api-gateway"
create_file   "$PROJECT_ROOT/api-gateway/package.json"
create_file   "$PROJECT_ROOT/api-gateway/index.js"

# Security folder
create_folder "$PROJECT_ROOT/api-gateway/security"
create_file   "$PROJECT_ROOT/api-gateway/security/spikeProtector.js"
create_file   "$PROJECT_ROOT/api-gateway/security/aiTrafficGuard.js"
create_file   "$PROJECT_ROOT/api-gateway/security/rateLimiter.js"

# Middleware folder
create_folder "$PROJECT_ROOT/api-gateway/middleware"
create_file   "$PROJECT_ROOT/api-gateway/middleware/internalAuth.js"

create_file   "$PROJECT_ROOT/api-gateway/.env.example"


# -----------------------------
# User Service (PORT 3000)
# -----------------------------
create_folder "$PROJECT_ROOT/user-service"
create_file   "$PROJECT_ROOT/user-service/package.json"
create_file   "$PROJECT_ROOT/user-service/index.js"
create_file   "$PROJECT_ROOT/user-service/db.js"
create_file   "$PROJECT_ROOT/user-service/.env.example"

# -----------------------------
# API Service (Mongo) (PORT 4000)
# -----------------------------

PROJECT_ROOT="applications"
SERVICE="mongo-service"

echo "📁 Creating Mongo Express Service structure..."

create_folder "$PROJECT_ROOT"
create_folder "$PROJECT_ROOT/$SERVICE"

# Root Files
create_file "$PROJECT_ROOT/$SERVICE/server.js"
create_file "$PROJECT_ROOT/$SERVICE/package.json"
create_file "$PROJECT_ROOT/$SERVICE/.env.example"
create_file "$PROJECT_ROOT/$SERVICE/README.md"

# SRC
create_folder "$PROJECT_ROOT/$SERVICE/src"
create_file   "$PROJECT_ROOT/$SERVICE/src/app.js"

# DB
create_folder "$PROJECT_ROOT/$SERVICE/src/db"
create_file   "$PROJECT_ROOT/$SERVICE/src/db/mongo.js"

# Configs
create_folder "$PROJECT_ROOT/$SERVICE/src/configs"
create_file   "$PROJECT_ROOT/$SERVICE/src/configs/env.js"

# Models
create_folder "$PROJECT_ROOT/$SERVICE/src/models"

for model in \
  User BookingAccount Booking Participant Event EventDay \
  FoodItem ParticipantFood \
  StayLocation StayUnit StayDuration ParticipantStay \
  QRCode Payment
do
  create_file "$PROJECT_ROOT/$SERVICE/src/models/${model}.js"
done

# Controllers
create_folder "$PROJECT_ROOT/$SERVICE/src/controllers"

for ctrl in auth booking participant food stay scan payment
do
  create_file "$PROJECT_ROOT/$SERVICE/src/controllers/${ctrl}.controller.js"
done

# Services
create_folder "$PROJECT_ROOT/$SERVICE/src/services"

for service in auth pricing qr payment
do
  create_file "$PROJECT_ROOT/$SERVICE/src/services/${service}.service.js"
done

# Validations
create_folder "$PROJECT_ROOT/$SERVICE/src/validations"

for val in auth booking participant food stay payment
do
  create_file "$PROJECT_ROOT/$SERVICE/src/validations/${val}.validation.js"
done

# Commons
create_folder "$PROJECT_ROOT/$SERVICE/src/commons"
create_file "$PROJECT_ROOT/$SERVICE/src/commons/roles.js"
create_file "$PROJECT_ROOT/$SERVICE/src/commons/constants.js"

# Utils
create_folder "$PROJECT_ROOT/$SERVICE/src/utils"
create_file "$PROJECT_ROOT/$SERVICE/src/utils/hash.js"
create_file "$PROJECT_ROOT/$SERVICE/src/utils/jwt.js"
create_file "$PROJECT_ROOT/$SERVICE/src/utils/response.js"
create_file "$PROJECT_ROOT/$SERVICE/src/utils/date.js"

# Routes (Single File)
create_folder "$PROJECT_ROOT/$SERVICE/src/routes"
create_file   "$PROJECT_ROOT/$SERVICE/src/routes/index.js"

echo "🎉 Mongo Express service structure created successfully!"

# -----------------------------
# AI Service (PORT 5000)
# -----------------------------
create_folder "$PROJECT_ROOT/ai-service"
create_file   "$PROJECT_ROOT/ai-service/package.json"
create_file   "$PROJECT_ROOT/ai-service/index.js"

# AI logic files
create_file   "$PROJECT_ROOT/ai-service/chatgpt.js"
create_file   "$PROJECT_ROOT/ai-service/localLLM.js"
create_file   "$PROJECT_ROOT/ai-service/pubsub.js"

create_file   "$PROJECT_ROOT/ai-service/.env.example"


# -----------------------------
# WebSocket Service (PORT 6000)
# -----------------------------
create_folder "$PROJECT_ROOT/websocket-service"
create_file   "$PROJECT_ROOT/websocket-service/package.json"
create_file   "$PROJECT_ROOT/websocket-service/index.js"
create_file   "$PROJECT_ROOT/websocket-service/.env.example"


# -----------------------------
# Cron Service (PORT 7000)
# -----------------------------
create_folder "$PROJECT_ROOT/cron-service"
create_file   "$PROJECT_ROOT/cron-service/package.json"
create_file   "$PROJECT_ROOT/cron-service/index.js"
create_file   "$PROJECT_ROOT/cron-service/.env.example"


# -----------------------------
# Payment Service (PORT 8000)
# -----------------------------
create_folder "$PROJECT_ROOT/payment-service"
create_file   "$PROJECT_ROOT/payment-service/package.json"
create_file   "$PROJECT_ROOT/payment-service/index.js"
create_file   "$PROJECT_ROOT/payment-service/razorpay.js"
create_file   "$PROJECT_ROOT/payment-service/verifyWebhook.js"
create_file   "$PROJECT_ROOT/payment-service/.env.example"


# -----------------------------
# Go Service (Optional Microservice)
# -----------------------------
create_folder "$PROJECT_ROOT/go-service"

create_file   "$PROJECT_ROOT/go-service/go.mod"

create_folder "$PROJECT_ROOT/go-service/cmd/server"
create_file   "$PROJECT_ROOT/go-service/cmd/server/main.go"

create_folder "$PROJECT_ROOT/go-service/internal/config"
create_file   "$PROJECT_ROOT/go-service/internal/config/config.go"

create_folder "$PROJECT_ROOT/go-service/internal/database"
create_file   "$PROJECT_ROOT/go-service/internal/database/mongo.go"

create_folder "$PROJECT_ROOT/go-service/internal/models"
create_file   "$PROJECT_ROOT/go-service/internal/models/item.go"

create_file "$PROJECT_ROOT/go-service/.env.example"


# -----------------------------
# Infra Folder
# -----------------------------
create_folder "$PROJECT_ROOT/infra"
create_file   "$PROJECT_ROOT/infra/ecosystem.config.js"
create_file   "$PROJECT_ROOT/infra/start-all.sh"


# -----------------------------
# Root README File
# -----------------------------
create_file "$PROJECT_ROOT/README.md"

echo "🎉 Microservices architecture structure created successfully!"
