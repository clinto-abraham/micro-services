#!/usr/bin/env bash
# Create PostgreSQL database "database_production" for sql-service (production).
# Credentials match micro-services/infra/ecosystem.config.js.
# Run from repo root or micro-services: ./scripts/create-database_production.sh

set -e
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-server-user}"
DB_NAME="database_production"

echo "Creating database '$DB_NAME' on $DB_HOST:$DB_PORT as $DB_USER (connect to 'postgres' first)..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 && echo "Database '$DB_NAME' already exists." || psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"
echo "Done."
