# Aula 09: Configurando Testes com Jest e Next.js

Nesta aula, configuramos o **Jest** (um framework de testes) para funcionar com nosso projeto **Next.js**. O objetivo é criar testes automatizados para garantir que nossa API funcione como esperado.

Para isso, modificamos 4 arquivos.

---

## 1. `jest.config.js` (Arquivo Novo)

Este arquivo diz ao Jest como ele deve rodar e entender os arquivos do nosso projeto Next.js.

**Código:**

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
```

- Explicação Simples:
  - `nextJest`: Usamos uma configuração pronta do Next.js para o Jest, assim não precisamos configurar tudo manualmente.

  - `moduleDirectories`: Esta é a parte mais importante. Além de procurar códigos em `node_modules`, mandamos o Jest procurar também na raiz do projeto `(<rootDir>)`.

  - Por que isso? Isso nos permite usar "imports absolutos". Em vez de import `../../infra/database.js` (complicado), podemos usar import `"infra/database.js"` (limpo e simples) de qualquer arquivo de teste.

## 2. No arquivo `database.js`:

- Ajustamos nosso arquivo de conexão com o banco de dados para que ele funcione bem em qualquer ambiente (desenvolvimento, produção ou teste), especialmente em relação ao SSL.

```javascript
import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(), // <--- MUDANÇA AQUI
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};

// Nova função para decidir o SSL
function getSSLValues() {
  // Se o provedor de nuvem (Vercel, Render) nos deu um certificado
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  // Só ligar o SSL (true) se estivermos em "production".
  // Em "development" ou "test" (local), fica desligado (false).
  return process.env.NODE_ENV === "production" ? true : false;
}
```

- 2. Explicação:
  - `getSSLValues()`: Criamos a função getSSLValues() para decidir automaticamente se a conexão com o banco precisa de SSL ou não.

  - **Em produção (na nuvem)**: O SSL é ativado (`true`).

  - **Em desenvolvimento (local) ou testes**: O SSL é desativado (`false`).

  - Isso evita erros de conexão quando estamos rodando os testes localmente.

## 3. No arquivo `post.test.js`:

Este é o nosso primeiro arquivo de teste. Ele vai testar se a `API POST /api/v1/migrations` está funcionando.

```javascript
const dotenv = require("dotenv");

// Força o carregamento das senhas do banco (do .env.development)
dotenv.config({
  path: ".env.development",
});

import database from "infra/database.js"; // Import absoluto (graças ao jest.config.js)

// Antes de TODOS os testes deste arquivo, limpa o banco
beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  // 1. AÇÃO: Faz uma chamada POST real para a API
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  // 2. VERIFICAÇÃO: Confere se a resposta foi "OK" (status 200)
  expect(response.status).toBe(200);

  // 3. VERIFICAÇÃO: Confere se o corpo da resposta é um array
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
});
```

- `dotenv.config`: Os testes rodam separados da aplicação, então precisamos dizer a eles onde pegar as senhas do banco (no arquivo .env.development).

- `beforeAll(cleanDatabase)`: Este comando do Jest garante que, antes de rodar os testes, a função cleanDatabase será executada.

- `cleanDatabase`: Esta função "zera" o banco de dados. Isso é vital para que um teste não interfira no resultado do outro.

test(...): Define o teste.

- `await fetch(...)`: Simula um usuário acessando nossa API com o método POST.

- `expect(...)`: É como perguntamos ao Jest: "Ei, o response.status é (toBe) 200?". Se for, o teste passa.

## 4. No arquivo `get.test.js`:

Este é o segundo arquivo de teste. Ele vai testar se a `API GET /api/v1/migrations` está funcionando.(Arquivo Novo).

```javascript
const dotenv = require("dotenv");

// Força o carregamento das senhas do banco (do .env.development)
dotenv.config({
  path: ".env.development",
});

import database from "infra/database.js";

// Antes de TODOS os testes deste arquivo, limpa o banco
beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should return 200", async () => {
  // 1. AÇÃO: Faz uma chamada GET real para a API
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  // 2. VERIFICAÇÃO: Confere se a resposta foi "OK" (status 200)
  expect(response.status).toBe(200);

  // 3. VERIFICAÇÃO: Confere se o corpo da resposta é um array
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);

  // 4. VERIFICAÇÃO EXTRA: Confere se o array não está vazio
  expect(responseBody.length).toBeGreaterThan(0);
});
```

- A estrutura é idêntica à do post.test.js (carrega dotenv, limpa o banco com beforeAll).

- A diferença é que aqui fazemos um fetch usando GET (o padrão).

- Adicionamos um teste extra: `expect(responseBody.length).toBeGreaterThan(0)`. Isso verifica se, após rodar o GET (que também executa as migrations), a lista de migrations aplicadas não está vazia.
