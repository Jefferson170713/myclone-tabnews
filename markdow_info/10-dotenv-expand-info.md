# O que é o `dotenv-expand`?

## 1. O que é o `dotenv-expand` é um "**plugin**" para o dotenv que permite que suas variáveis de ambiente usem outras variáveis de ambiente.

- 1.2 Pense nele como uma ferramenta que "``preenche as lacunas``" dentro do seu próprio arquivo ``.env``.

- 1.3 O ``dotenv``: Carrega variáveis de um arquivo ``.env`` para ``process.env``.

- 1.4 O ``dotenv-expand``: Lê as variáveis que o dotenv acabou de carregar e "expande" qualquer variável que use a sintaxe ``${VARIAVEL}``.

## 2. Vamos analisar ``.env.development``:
### Exemplo de como está no código atualmente:

```yaml
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=local_user
POSTGRES_DB=local_db
POSTGRES_PASSWORD=local_password
NODE_ENV=development
DATABASE_URL=postgres://local_user:local_password@localhost:5432/local_db
```
### 2.1 O Problema que Ele Resolve:

Note que você repetiu manualmente as informações:

- local_user (de ``POSTGRES_USER``)

- local_password (de ``POSTGRES_PASSWORD``)

- localhost (de ``POSTGRES_HOST``, embora o seu tenha um _ a mais)

- 5432 (de ``POSTGRES_PORT``)

- local_db (de ``POSTGRES_DB``)

Qual é o risco? Se amanhã você decidir mudar a porta (``POSTGRES_PORT``) para 5432, você teria que se lembrar de mudar em dois lugares: na linha ``POSTGRES_PORT`` e na linha DATABASE_URL.

Se você esquecer, sua aplicação vai quebrar de um jeito difícil de debugar (o ``DATABASE_URL`` estará apontando para a porta antiga).

## 3. A Solução com ``dotenv-expand``

Com o ``dotenv-expand``, você pode reescrever seu arquivo ``.env.development`` para seguir o princípio DRY (Don't Repeat Yourself - Não se Repita).

### Veja como ele ficaria:

```yaml
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=local_user
POSTGRES_DB=local_db
POSTGRES_PASSWORD=local_password
NODE_ENV=development
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

- Quando o ``dotenv-expand`` rodar, ele fará o seguinte:

- Vê ``DATABASE_URL=postgres://${POSTGRES_USER}...``

- Procura o valor de ``POSTGRES_USER`` (acha local_user).

- Procura o valor de ``POSTGRES_PASSWORD`` (acha local_password).

- ...e assim por diante.

No final, ele "expande" a variável e o **``process.env.DATABASE_URL``** terá o valor final: postgres://local_user:local_password@localhost:5432/local_db

Agora, se você precisar mudar a porta, você só muda ``POSTGRES_PORT`` e o ``DATABASE_URL`` será atualizado automaticamente.

## 4. E por que instalar o ``dotenv-expand@11.0.6``?

O comando ``npm install dotenv-expand@11.0.6`` força a instalação da versão exata **11.0.6**.

Isso é uma prática de engenharia de software chamada "**version pinning**" (fixação de versão).

**npm install dotenv-expand**: Instala a versão mais recente disponível. Isso é arriscado, pois a versão de amanhã pode ter uma mudança que quebre seu código.

**npm install dotenv-expand@11.0.6**: Instala exatamente essa versão.

Por que fazer isso? Para garantir Reproducibility (Reprodutibilidade). Você garante que o código que funciona na sua máquina hoje vai funcionar exatamente da mesma forma na máquina do seu colega de equipe e no servidor de CI/CD (Integração Contínua) amanhã.