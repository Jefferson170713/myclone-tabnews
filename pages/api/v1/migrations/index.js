import migrateRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(requerest, response) {
  const migrations = await migrateRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });
  response.status(200).json(migrations);
}
