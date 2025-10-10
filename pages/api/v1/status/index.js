import database from "infra/database.js";

async function status(requerest, response) {

  const updateAt = new Date().toISOString();

  const databaseVersionResult = await database.query("Show server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;;

  const databaseConectionsResult = await database.query("SHOW max_connections;");
  const databaseConectionsValue = databaseConectionsResult.rows[0].max_connections;
  const databaseConectionValuePareInt = parseInt(databaseConectionsValue);
  
  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections : databaseConectionValuePareInt,
      }
    }
  });
}

export default status;
