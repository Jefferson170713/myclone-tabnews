# Migrations com o Node-pg-migrate

## O que é o Node-pg-migrate?

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