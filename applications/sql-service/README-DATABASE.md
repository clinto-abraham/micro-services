# SQL Service — Database

The **sql-service** uses its **own** PostgreSQL database, configured via env:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

**This is not the same as the monorepo `nmg_streaming` database.**  
In DBeaver you may see:

- **nmg_streaming** (localhost:5432) — used by the **NMG monorepo backend** (Express, live-streams, auth, etc.).
- **sql-service DB** — whatever `DB_NAME` is set to in sql-service’s `.env.development` (e.g. `database_development`). That is where sql-service tables (Users, AppConfigs, etc.) live.

## AppConfigs (gateway routing)

To use the API Gateway’s dynamic routing by app name:

1. Run migrations for **sql-service’s** database:
   ```bash
   cd micro-services/applications/sql-service
   npm run db:migrate:dev
   ```

2. Seed the `AppConfigs` table so the gateway can resolve app name → backend port:
   ```bash
   npm run db:seed:dev
   ```

3. Ensure `INTERNAL_SERVICE_SECRET` is set in both **api-gateway** and **sql-service** env so the gateway can call the internal app-config endpoint.
