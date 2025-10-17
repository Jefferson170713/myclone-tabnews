# Migrations com o Node-pg-migrate

## 1. O que é o Node-pg-migrate?

- 1. O Node-pg-migrate é uma ferramenta de migração de banco de dados para PostgreSQL, escrita em Node.js. Ele permite que você gerencie alterações no esquema do banco de dados de forma organizada e controlada. Com o Node-pg-migrate, você pode criar, aplicar e reverter migrações de banco de dados usando scripts JavaScript ou TypeScript. Ele é especialmente útil em projetos onde o esquema do banco de dados está em constante evolução, permitindo que equipes de desenvolvimento mantenham o controle sobre as mudanças e garantam a consistência do banco de dados em diferentes ambientes. 

- 2. O Node-pg-migrate oferece uma série de recursos, incluindo a capacidade de criar migrações incrementais, executar migrações em ordem, reverter migrações específicas e gerenciar o estado do banco de dados. Ele também suporta a execução de comandos SQL personalizados dentro das migrações, proporcionando flexibilidade para atender às necessidades específicas do seu projeto. Além disso, o Node-pg-migrate é compatível com TypeScript, permitindo que você escreva migrações usando tipagem estática para maior segurança e clareza no código.

- 3. Para o nosso projeto vamos instalar o Node-pg-migrate como uma dependência de desenvolvimento. Podemos fazer isso usando o npm ou yarn. Aqui está o comando para instalar o Node-pg-migrate na versão `6.2.2`:

```bash
npm install node-pg-migrate@6.2.2 --save-dev
```
- 3.1 Com esse comando executado, o arquivo de `package.json` será atualizado em suas dependências:

```json
    "devDependencies": {
        "node-pg-migrate": "^6.2.2",
        "prettier": "^3.6.2"
    }
```

## 2. Criando o script de migração.

- 1. Para criar o script de migração para ser executado, no arquivo `package.json` em `scripts`:

```json
"scripts": {
    "dev": "next dev",
    "dev:run": "npm run services:up && next dev",
    "services:up": "docker compose -f infra/compose.yaml up -d",
    "services:stop": "docker compose -f infra/compose.yaml stop",
    "services:down": "docker compose -f infra/compose.yaml down",
    "lint:check": "prettier --check .",
    "lint:fix": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watchAll",
    "migrate:create": "node-pg-migrate create"
  }
```

- 2. Depois vamos executar o comando que acabamos de inserir e daremos um nome a para a migração:

```bash
npm run migrate:create first-migrate-test
```
- 3. Após rodar isso, os arquivos de migração aparecerá os arquivos de migração de acordo `Unix Timestamp` e é assim que as migrações são sempre executadas na ordem pois pegam sempre os miles segundos.


- 4. Mas faremos isso direito e como as migrações precisam estar dentro da pasta `infra/migrations` vamos refatorar a parte de **scripts**:

```json
  "scripts": {
    "dev": "next dev",
    "dev:run": "npm run services:up && next dev",
    "services:up": "docker compose -f infra/compose.yaml up -d",
    "services:stop": "docker compose -f infra/compose.yaml stop",
    "services:down": "docker compose -f infra/compose.yaml down",
    "lint:check": "prettier --check .",
    "lint:fix": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watchAll",
    "migrate:create": "node-pg-migrate -m infra/migrations create"
  }
```

## 3. Passando as credenciais corretas paga o **node-pg-migrate**.

- 1. Para fazer isso é necessário instalar o `dotenv` para fazer o node-pg-migrate se comunicar com o nosso banco de dados que é *POSTGRES*.

- 2. Vamos instalar `dotenv`(Lembrando que o nosso está __`.env.development`__), para o curso iremos usar a versão **"16.4.4"**:

```bash
npm install dotenv@16.4.4
```

- 3. Após instalar, faz-se necessário especificar na variável `--envPath` em scripts do arquivo `package.json`:

```json
  "scripts": {
    "dev": "next dev",
    "dev:run": "npm run services:up && next dev",
    "services:up": "docker compose -f infra/compose.yaml up -d",
    "services:stop": "docker compose -f infra/compose.yaml stop",
    "services:down": "docker compose -f infra/compose.yaml down",
    "lint:check": "prettier --check .",
    "lint:fix": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watchAll",
    "migration:create": "node-pg-migrate -m infra/migrations create",
    "migration:up": "node-pg-migrate -m infra/migrations --envPath .env.development up"
  }
```

- 4. feito isso, agora precisamos criar a variável de atributo para o arquivo `.env.development` e com isso o `dotenv` reconhecer a variável e **`DATABASE_URL`**:

```yaml
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=local_user
POSTGRES_DB=local_db
POSTGRES_PASSWORD=local_password
NODE_ENV=development
DATABASE_URL=postgres://local_user:local_password@localhost:5432/local_db
```

- 5. Agora é só executar o comando **migration:up**:

```bash
npm run migration:up
```