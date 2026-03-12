#!/usr/bin/env bash
# Create PostgreSQL databases for sql-service: database_development, database_test, database_stage, database_production.
# Credentials match sql-service .env (DB_HOST, DB_PORT, DB_USER). Run from repo root or micro-services.
#
# Usage: ./scripts/create-sql-service-databases.sh [development|test|stage|production|all]
#
# If role "server-user" does not exist yet, use the postgres superuser to create the databases:
#   POSTGRES_ADMIN_USER=postgres ./scripts/create-sql-service-databases.sh all
# (Set PGPASSWORD if your postgres user has a password.)
# Then create the app role and grant access - see README or run: ./scripts/create-sql-service-role.sh

set -e
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-5432}"
# Use POSTGRES_ADMIN_USER (e.g. postgres) when server-user does not exist yet
PSQL_USER="${POSTGRES_ADMIN_USER:-${DB_USER:-server-user}}"

DATABASES=("database_development" "database_test" "database_stage" "database_production")

# Check we can connect before creating anything
if ! psql -h "$DB_HOST" -p "$DB_PORT" -U "$PSQL_USER" -d postgres -tc "SELECT 1" &>/dev/null; then
  echo "Cannot connect to PostgreSQL as '$PSQL_USER' at $DB_HOST:$DB_PORT."
  echo ""
  echo "If role 'server-user' does not exist yet, use the postgres superuser to create the databases:"
  echo "  POSTGRES_ADMIN_USER=postgres $0 ${1:-all}"
  echo "Set PGPASSWORD=... if your postgres user requires a password."
  exit 1
fi

create_one() {
  local name="$1"
  if psql -h "$DB_HOST" -p "$DB_PORT" -U "$PSQL_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$name'" | grep -q 1; then
    echo "Database '$name' already exists."
  else
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$PSQL_USER" -d postgres -c "CREATE DATABASE $name;"
    echo "Created '$name'."
  fi
}

case "${1:-all}" in
  development) create_one "database_development" ;;
  test)        create_one "database_test" ;;
  stage)       create_one "database_stage" ;;
  production)  create_one "database_production" ;;
  all)
    for db in "${DATABASES[@]}"; do create_one "$db"; done
    ;;
  *)
    echo "Usage: $0 [development|test|stage|production|all]"
    exit 1
    ;;
esac
echo "Done."
