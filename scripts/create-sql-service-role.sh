#!/usr/bin/env bash
# Create PostgreSQL role "server-user" and grant it access to sql-service databases.
# Run as postgres superuser (e.g. POSTGRES_ADMIN_USER=postgres) after creating the databases.
# Password matches sql-service .env: server-user-clinto

set -e
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-5432}"
PSQL_USER="${POSTGRES_ADMIN_USER:-postgres}"
ROLE_USER="${SQL_SERVICE_USER:-server-user}"
ROLE_PASSWORD="${SQL_SERVICE_PASSWORD:-server-user-clinto}"

echo "Creating role '$ROLE_USER' and granting access to databases..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$PSQL_USER" -d postgres <<EOF
-- Create role if it doesn't exist (with login and password)
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$ROLE_USER') THEN
    CREATE ROLE "$ROLE_USER" WITH LOGIN PASSWORD '$ROLE_PASSWORD';
    RAISE NOTICE 'Role % created.', '$ROLE_USER';
  ELSE
    RAISE NOTICE 'Role % already exists.', '$ROLE_USER';
  END IF;
END
\$\$;

-- Grant connect and usage on databases
GRANT CONNECT ON DATABASE database_development TO "$ROLE_USER";
GRANT CONNECT ON DATABASE database_test TO "$ROLE_USER";
GRANT CONNECT ON DATABASE database_stage TO "$ROLE_USER";
GRANT CONNECT ON DATABASE database_production TO "$ROLE_USER";

-- Grant schema and table permissions (needed for Sequelize sync/migrate)
\c database_development
GRANT USAGE ON SCHEMA public TO "$ROLE_USER";
GRANT CREATE ON SCHEMA public TO "$ROLE_USER";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "$ROLE_USER";

\c database_test
GRANT USAGE ON SCHEMA public TO "$ROLE_USER";
GRANT CREATE ON SCHEMA public TO "$ROLE_USER";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "$ROLE_USER";

\c database_stage
GRANT USAGE ON SCHEMA public TO "$ROLE_USER";
GRANT CREATE ON SCHEMA public TO "$ROLE_USER";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "$ROLE_USER";

\c database_production
GRANT USAGE ON SCHEMA public TO "$ROLE_USER";
GRANT CREATE ON SCHEMA public TO "$ROLE_USER";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "$ROLE_USER";
EOF

echo "Done. sql-service can now connect as $ROLE_USER."
