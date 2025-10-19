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
import migrateRunner from "node-pg-migrate"; //Importa a função principal da biblioteca
import { join } from "node:path"; //mporta a função join do módulo path nativo do Node.js. Ela é usada para construir caminhos de diretórios de forma segura e compatível com diferentes sistemas operacionais (como Windows, Linux e macOS)

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
```
