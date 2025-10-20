# Construindo uma api de migração.

## Migrations com o Node-pg-migrate

## 1. O que é o Node-pg-migrate?

- O `node-pg-migrate` é uma ferramenta de migração de banco de dados para Node.js e PostgreSQL. Ele permite que você gerencie as alterações no esquema do seu banco de dados de forma versionada e programática, facilitando o trabalho em equipe e a implantação em diferentes ambientes. Com ele, você pode escrever migrações em SQL ou JavaScript.

## 2. Criando a pastas da `api`:

- 2.1 Na raiz do nosso projeto tem duas pastas, a `pages` e a `tests`:
  - Dentro de `pages/api/v1`, vamos criar a pasta e o arquivo:

  - `pages/api/v1/migrations/index.js`

  - Dentro da `tests/integration/api/v1` vamos criar a pasta e o arquivo:

  - `tests/integration/api/v1/migrations/index.js`

- 2.2 Aquivo `pages/api/v1/migrations/index.js`:

```javascript
import migrateRunner from "node-pg-migrate"; // Importa a função principal da biblioteca node-pg-migrate.
import { join } from "node:path"; // Importa a função "join" para unir caminhos de diretórios de forma segura.

export default async function migrations(requerest, response) {
  const migrations = await migrateRunner({
    databaseUrl: process.env.DATABASE_URL, // Pega a URL do banco de dados das variáveis de ambiente.
    dryRun: true, // Executa a migração em modo de simulação, sem aplicar as alterações no banco.
    dir: join("infra", "migrations"), // Define o diretório onde os arquivos de migração estão localizados.
    direction: "up", // Define a direção da migração, "up" para aplicar e "down" para reverter.
    verbose: true, // Habilita logs detalhados durante a execução da migração.
    migrationsTable: "pgmigrations", // Define o nome da tabela que controla o histórico de migrações.
  });
  response.status(200).json(migrations);
}
```
## 3. dividindo a resposta da migração em duas partes (`GET` e `POST`)

- 3.1 Dependendo da resposta da migração o banco de dados irá responder de um jeito diferente.

```javascript
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
```
