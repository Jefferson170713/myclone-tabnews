import migrateRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const defaltMigrationsOptions = {
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    }

  if (request.method === "GET") {
    console.log(request.method);
    const paddingMigrations = await migrateRunner(
      defaltMigrationsOptions,
    );

    return response.status(200).json(paddingMigrations);
  }

  if (request.method === "POST") {
    console.log(request.method);
    const migratedMigrations = await migrateRunner({
      ...defaltMigrationsOptions,
      dryRun: false,
  });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}
