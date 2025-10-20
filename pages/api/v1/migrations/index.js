import migrateRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {

  if (request.method === "GET") {
    console.log(request.method);
    const migrations = await migrateRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });

    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    console.log(request.method);
    const migrations = await migrateRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    
    return response.status(200).json(migrations);
  }

  return response.status(405).end();
}
