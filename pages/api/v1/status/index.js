import database from "infra/database.js";

async function status(requerest, response) {
  const result = await database.query("SELECT 10 + 7 AS SOMA;");
  console.log(result.rows[0]);
  response.status(200).json({ chave: "(200) - Meu status está ok!" });
}

export default status;
