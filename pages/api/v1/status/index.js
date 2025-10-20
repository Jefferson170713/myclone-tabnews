import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseConectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseConectionsValue =
    databaseConectionsResult.rows[0].max_connections;
  const databaseConectionValuePareInt = parseInt(databaseConectionsValue);

  const databaseName = process.env.POSTGRES_DB; // pegando o nome do banco de dados pelo env.development

  const databaseOpenConectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  }); // Quantidade de conexões abertas
  const databaseOpenConectionsValue =
    databaseOpenConectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseConectionValuePareInt,
        opened_conections: databaseOpenConectionsValue,
      },
    },
  });
}

export default status;
