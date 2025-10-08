# Docker no GitHub Codespaces

## O que é Docker?

Docker é uma plataforma que permite criar, executar e gerenciar containers. Containers são ambientes isolados que facilitam o desenvolvimento, testes e implantação de aplicações, garantindo que funcionem da mesma forma em qualquer lugar.

## Docker no Codespaces

No GitHub Codespaces, o ambiente de desenvolvimento é executado dentro de um container Docker. Isso garante que todas as dependências, ferramentas e configurações estejam padronizadas para todos os desenvolvedores do projeto.

### Principais arquivos

- **Dockerfile:** Define a imagem base e os comandos para instalar dependências e configurar o ambiente.
- **devcontainer.json:** Arquivo de configuração que indica como o Codespaces deve montar o ambiente, quais serviços adicionais iniciar e como integrar o Dockerfile.

### Vantagens

- **Ambiente isolado:** Cada Codespace roda em um container independente, evitando conflitos de dependências.
- **Reprodutibilidade:** Todos os desenvolvedores usam o mesmo ambiente, facilitando testes e integração.
- **Personalização:** É possível instalar pacotes, configurar variáveis e rodar serviços extras (como bancos de dados) usando Docker.

### Comandos úteis

- Para listar containers ativos:
  ```bash
  docker ps
  ```
- Para construir uma imagem:
  ```bash
  docker build -t nome-imagem .
  ```
- Para rodar um container:
  ```bash
  docker run -it nome-imagem
  ```

### Documentação

Para mais detalhes, consulte:
- [Documentação oficial do Codespaces](https://docs.github.com/pt/codespaces)
- [Documentação oficial do Docker](https://docs.docker.com/)

---

Este resumo serve como referência rápida sobre como o Docker é utilizado no Codespaces e como configurar seu ambiente de desenvolvimento.

# 1. Para o curso.

## Com seu **codespaces** aberto, abra o terminal(CTRL + J) e digite o comando abaixo para verificar se o Docker está instalado:

```bash
docker --version
```
- Então você verá a versão do Docker instalada.

- Outro comando é **docker-compose**:

```bash
docker-compose --version
```
- Então você verá a versão do Docker Compose instalada. Mas o que é o Docker Compose?

- O Docker Compose é uma ferramenta para definir e gerenciar aplicativos Docker de múltiplos containers. Com ele, você pode usar um arquivo YAML para configurar os serviços do seu aplicativo, redes e volumes, facilitando a orquestração dos containers. E essa forma de comando é mais simples do que usar o Docker CLI diretamente. Outro ponto é que o **docker compose** é usado para ambientes de desenvolvimento, testes e staging, enquanto o **Docker Swarm** e o **Kubernetes** são mais adequados para ambientes de produção. E o termo "Compose" é usado para descrever a combinação de múltiplos containers que trabalham juntos para formar um aplicativo completo.

```bash
docker compose 
```

- Então você verá a lista de comandos do Docker Compose. Uma lista de comandos do Docker Compose que você pode usar para gerenciar seus aplicativos Docker de múltiplos containers.

# 2. Arquivo **compose.yaml**

## O que é o arquivo **compose.yaml**?

- O arquivo **compose.yaml** é um arquivo de configuração usado pelo Docker Compose para definir e gerenciar aplicativos Docker de múltiplos containers. Ele permite que você especifique os serviços, redes e volumes necessários para o seu aplicativo em um formato YAML fácil de ler e escrever.

- Em nosso projeto, por convenção usamos o nome **compose.yaml**. Mas você também pode usar o nome **docker-compose.yaml** ou **docker-compose.yml**.

## Estrutura do arquivo **compose.yaml**

- A estrutura básica do arquivo **compose.yaml** inclui os seguintes elementos principais:

```yaml
version: '3'  # Versão do Docker Compose
services:     # Definição dos serviços (containers)
    web:        # Nome do serviço
        image: nginx:latest  # Imagem Docker a ser usada
        ports:              # Mapeamento de portas
            - "80:80"
        volumes:            # Montagem de volumes
            - ./html:/usr/share/nginx/html
    db:         # Outro serviço
        image: mysql:latest
        environment:       # Variáveis de ambiente
            MYSQL_ROOT_PASSWORD: example
networks:    # Definição de redes
    default:
        driver: bridge
volumes:     # Definição de volumes
    db_data:
```
### Um detalhe sobre a extensão do arquivo **compose.yaml**,  o **YAML**.

- YAML (YAML Ain't Markup Language) é um formato de serialização de dados legível por humanos, usado para configuração de arquivos. Ele é frequentemente utilizado em aplicativos que envolvem múltiplos containers, como o Docker Compose, devido à sua simplicidade e clareza.

- Para o nosso curso, criaremos na raiz do projeto o arquivo **compose.yaml** com o seguinte conteúdo:

```yaml
services:
  database:
    image: 'postgres:16.0-alpine3.18'
    environment:
      POSTGRES_PASSWORD: 'local_password'
``` 
- A versão do **Postgres** que usaremos é a **16.0-alpine3.18**. As versões com o nome **alpine** são versões mais leves, ou seja, ocupam menos espaço em disco e consomem menos recursos do sistema. Elas são baseadas na distribuição Alpine Linux, que é conhecida por sua simplicidade e eficiência.

###  Vamos rodar o comando abaixo para subir o serviço do banco de dados Postgres:

```bash
docker compose up
```
- Mas no nosso caso, podemos rodar o comando abaixo porque colocamos o arquivo **compose.yaml** dentro da pasta **infra**:

```bash
docker compose -f infra/compose.yaml up -d
```
ou 
```bash
docker compose --file infra/compose.yaml up -d
```
- O comando **-f** é usado para especificar o caminho do arquivo de configuração do Docker Compose. No nosso caso, o arquivo está localizado na pasta **infra**. E o comando **up** é usado para criar e iniciar os containers definidos no arquivo de configuração. Já o comando **-d** é usado para rodar os containers em segundo plano (detached mode), permitindo que você continue usando o terminal.
- Então você verá a seguinte saída no terminal, para sair do serviço, use o comando **CTRL + C**:

```bash
docker compose up
@Jefferson170713 ➜ /workspaces/myclone-tabnews (main) $ docker compose up
Attaching to database-1
database-1  | 
database-1  | PostgreSQL Database directory appears to contain a database; Skipping initialization
database-1  | 
database-1  | 2025-10-02 14:16:26.611 UTC [1] LOG:  starting PostgreSQL 16.0 on x86_64-pc-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r10) 12.2.1 20220924, 64-bit
database-1  | 2025-10-02 14:16:26.611 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
database-1  | 2025-10-02 14:16:26.611 UTC [1] LOG:  listening on IPv6 address "::", port 5432
database-1  | 2025-10-02 14:16:26.616 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
database-1  | 2025-10-02 14:16:26.621 UTC [24] LOG:  database system was shut down at 2025-10-02 14:09:53 UTC
databas
```

### Se o serviço do banco parou inesperadamente, você pode rodar o comando abaixo para subir o serviço em segundo plano:

- O comando abaixo é usado para listar os processos, e quando os serviços são desligados inesperadamente, eles ainda aparecem na lista de processos, mas com o status "Exited" (saído). Isso indica que o serviço foi iniciado, mas não está mais em execução. E os valores que indicam são 0 ou diferentes de 0. Onde o 0 indica que o serviço foi encerrado corretamente, sem erros. Já os valores diferentes de 0 indicam que houve algum tipo de erro ou problema durante a execução do serviço.

- Para listar todos os containers, incluindo os que estão parados, você pode usar o comando abaixo:

```bash
docker ps -a 
```

```bash
docker ps --all
```  

- Por convenção existe o exit codes 0, que indica que o processo foi concluído com sucesso, sem erros. Já os códigos diferentes de 0 indicam que houve algum tipo de erro ou problema durante a execução do processo.

- Então você verá a seguinte saída no terminal: 

```bash
@Jefferson170713 ➜ /workspaces/myclone-tabnews (main) $ docker ps -a
CONTAINER ID   IMAGE                      COMMAND                  CREATED      STATUS                      PORTS     NAMES
75cad64ac500   postgres:16.0-alpine3.18   "docker-entrypoint.s…"   4 days ago   Exited (0) 17 seconds ago             myclone-tabnews-database-1                                                                                                 0.8s
```  
- Para listar os logs do serviço do banco de dados, você pode usar o comando abaixo:

```bash
docker logs <container_id>
```
- No caso foi **myclone-tabnews-database-1**. Então você verá a seguinte saída no terminal:

```bash
docker logs myclone-tabnews-database-1
```

# 3. Rodando o serviço do banco de dados em segundo plano

- Para rodar o serviço do banco de dados em segundo plano, você pode usar o comando abaixo:

```bash
docker compose up -d
```
- Então você verá a seguinte saída no terminal:

```bash
@Jefferson170713 ➜ /workspaces/myclone-tabnews (main) $ docker compose up -d
[+] Running 2/2
 ✔ Network myclone-tabnews_default       Created 
 ✔ Container myclone-tabnews-database-1  Started
```
 - para fechar o serviço do banco de dados, você pode usar o comando abaixo:

```bash
docker compose down
```
- Então você verá a seguinte saída no terminal: 

```bash
@Jefferson170713 ➜ /workspaces/myclone-tabnews (main) $ docker compose down
[+] Running 2/2
 ✔ Container myclone-tabnews-database-1  Removed 
 ✔ Network myclone-tabnews_default       Removed
```

- Agora vamos atualizar o pocote de instalador com o comando abaixo:

```bash
sudo apt update
```
### Então vamos instalar o pocote do postgres com o comando abaixo:

```bash
sudo apt install postgresql-client
```

# 4. Conectando ao banco de dados Postgres

- Agora vamos conectar ao banco de dados Postgres com o comando abaixo:

```bash
psql --host=localhost --username=postgres --port=5432
```
- Então pede para digitar a senha, que no nosso caso é **local_password**. Então você verá a seguinte saída no terminal:
- A porta nos definimos no arquivo **compose.yaml**.

- Com isso ele entra no **psql**. Então ele abre uma parte interativa do **psql**. Onde você pode digitar comandos SQL para interagir com o banco de dados Postgres.

```bash
SELECT 1 + 1;
```
- Então você verá a seguinte saída no terminal: 

```bash
 ?column?
---------- 2
(1 row)
```

- Mostrando que está funcionando e para sair digite o comando abaixo:

```bash
\q
```

# 5. Movendo para a pasta backend de **infra** e rodando o serviço do banco de dados:
```bash
docker compose -f infra/compose.yaml up -d
```