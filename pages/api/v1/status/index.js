import database from "../../../../infra/database.js";

function status(requerest, response) {
  console.log(database);
  response.status(200).json({ chave: "Meu status está ok!" });
}

export default status;
