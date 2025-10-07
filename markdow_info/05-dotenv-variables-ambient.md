# `dotenv` ou variáveis de ambiente (.env).

- Como estamos usando o `Docker` para rodar o banco de dados `PostgreSQL`, precisamos configurar algumas variáveis de ambiente para que o banco funcione corretamente. Essas variáveis são usadas para definir o nome do banco de dados, o usuário, a senha e outras configurações necessárias para o `PostgreSQL`.

## 1. O que são variáveis de ambiente?

- Variáveis de ambiente são pares chave-valor que podem ser usados para configurar o comportamento de aplicativos e serviços sem alterar o código-fonte. Elas são frequentemente usadas para armazenar informações sensíveis, como credenciais de banco de dados, chaves de API e configurações específicas do ambiente (desenvolvimento, teste, produção).

- Um arquivo `.env` é um arquivo de texto simples que contém variáveis de ambiente em formato chave-valor. Ele é usado para definir essas variáveis de ambiente de forma fácil e organizada. O arquivo `.env` geralmente é colocado na raiz do projeto e não deve ser incluído no controle de versão (como Git) para proteger informações sensíveis.

## Como usar um arquivo `.env`?

- Para usar um arquivo `.env`, você pode seguir estes passos:

1. Crie um arquivo chamado `.env` na raiz do seu projeto.

2. Adicione suas variáveis de ambiente no formato `CHAVE=valor`, uma por linha. Por exemplo:

   ```yaml 
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=meu_usuario
   POSTGRES_DB=meu_banco
   POSTGRES_PASSWORD=minha_senha
   ```
3. Configure seu aplicativo ou serviço para carregar as variáveis de ambiente do arquivo `.env`.

- No caso do Docker Compose, você pode usar a diretiva `env_file` no seu arquivo `compose.yaml` para especificar o arquivo `.env` que contém as variáveis de ambiente. Por exemplo:

```yaml
services:
    database:
        image: 'postgres:16.0-alpine3.18'
        env_file:
            - ../.env
        ports:
            - "5432:5432"
```

## 2. EM NOSSO PROJETO VAMOS CONFIGURAR O NOSSO AMBIENTE DE HOMOLOGAÇÃO:

- 1. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```yaml
POSTGRES_HOST=localhost # Nome padrão do host do banco de dados que vem do postgres
POSTGRES_PORT=5432 # Porta padrão do postgres
POSTGRES_USER=local_user # Nome do usuário do banco de dados
POSTGRES_DB=local_db # Nome do banco de dados
POSTGRES_PASSWORD=local_password # Senha do usuário do banco de dados que definimos para o serviço de homologação
```

- 2. Atualize o arquivo `compose.yaml` para usar o arquivo `.env`:

    - Antes estava assim:
    
    ```yaml
    services:
      database:
        image: 'postgres:16.0-alpine3.18'
        environment:
          POSTGRES_PASSWORD: 'local_password'
        ports:
          - "5432:5432"
    ```
    - Agora deve ficar assim:
    
    ```yaml
    services:
      database:
        image: 'postgres:16.0-alpine3.18'
        env_file:
          - ../.env
        ports:
          - "5432:5432"
    ```
- 3. Atualize o arquivo `database.js` para usar as variáveis de ambiente do arquivo `.env`:

```javascript
    import { Client } from "pg"; // Importa o cliente do PostgreSQL

    async function query(queryObject) { // Criando a função query que recebe um objeto de consulta
        const client = new Client({ // Cria uma nova instância do cliente do PostgreSQL
            host: process.env.POSTGRES_HOST, // Usa a variável de ambiente para o host
            port: process.env.POSTGRES_PORT, // Usa a variável de ambiente para a porta
            user: process.env.POSTGRES_USER, // Usa a variável de ambiente para o usuário
            database: process.env.POSTGRES_DB, // Usa a variável de ambiente para o banco de dados
            password: process.env.POSTGRES_PASSWORD, // Usa a variável de ambiente para a senha
        });
        await client.connect(); // Conecta ao banco de dados
        const result = await client.query(queryObject); // Executa a consulta passada como argumento
        await client.end(); // Encerra a conexão com o banco de dados
        return result; // Retorna o resultado da consulta
    }

    export default { query: query, }; // Exporta a função query para ser usada em outros arquivos
```
