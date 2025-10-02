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