# Guia sobre o arquivo `jsconfig.json`

## 1. O que é o `jsconfig.json`?

- O `jsconfig.json` é um arquivo de configuração usado em projetos JavaScript para definir opções específicas do compilador e do ambiente de desenvolvimento. Ele é especialmente útil em projetos que utilizam o Visual Studio Code, pois ajuda a melhorar a experiência de desenvolvimento, fornecendo informações sobre o projeto, como caminhos de módulos, opções de compilação e outras configurações.

### Funciona apenas para arquivos JavaScript?

- Sim, o `jsconfig.json` é especificamente projetado para projetos JavaScript. No entanto, se você estiver usando TypeScript, o arquivo equivalente seria o `tsconfig.json`, que oferece funcionalidades semelhantes, mas com suporte adicional para recursos específicos do TypeScript.

## 2. Estrutura do `jsconfig.json`
- O arquivo `jsconfig.json` é um arquivo JSON que pode conter várias propriedades. Aqui está uma estrutura básica:

```json
{
    "compilerOptions": {
        "baseUrl": ".", // Define a base para resolver caminhos relativos
        "paths": {      // Define alias para caminhos de módulos
            "@components/*": ["src/components/*"],
            "@utils/*": ["src/utils/*"]
        },
        "target": "ES6", // Define a versão do JavaScript alvo
        "module": "commonjs", // Define o sistema de módulos
        "allowJs": true, // Permite a inclusão de arquivos JavaScript
        "checkJs": true  // Habilita a verificação de tipos em arquivos JavaScript
    },
    "include": ["src/**/*"], // Especifica os arquivos a serem incluídos no projeto
    "exclude": ["node_modules", "**/node_modules/*"] // Especifica os arquivos a serem excluídos do projeto
}
```

## 3. Propriedades Comuns

- `compilerOptions`: Define várias opções de compilação, como `baseUrl`, `paths`, `target`, `module`, entre outras.
- `include`: Especifica os arquivos e diretórios que devem ser incluídos no projeto.
- `exclude`: Especifica os arquivos e diretórios que devem ser excluídos do projeto.
- `files`: Lista específica de arquivos a serem incluídos no projeto.

## 4. Benefícios do `jsconfig.json`

- **Melhora a navegação do código**: Com o `jsconfig.json`, o editor pode entender melhor a estrutura do projeto, facilitando a navegação entre arquivos.
- **Suporte a alias de módulos**: Permite definir alias para caminhos de módulos, tornando as importações mais limpas e fáceis de gerenciar.
- **Verificação de tipos**: Com a opção `checkJs`, é possível habilitar a verificação de tipos em arquivos JavaScript, ajudando a identificar erros mais cedo.
- **Configuração personalizada**: Permite personalizar o ambiente de desenvolvimento de acordo com as necessidades do projeto.

## 5. Exemplo Prático do nosso projeto e como instalar.

- Abra o terminal com o atalho `Ctrl + j`. Digite o comando abaixo para criar o arquivo `jsconfig.json` na raiz do projeto:

```bash
echo {} > jsconfig.json
```
ou 

```bash
touch jsconfig.json
```
ou 

```bash
code jsconfig.json
```

- Em seguida, copie e cole o conteúdo abaixo no arquivo `jsconfig.json`:

```json
{
    "compilerOptions": {
        "baseUrl": "."
    }
}
```
- Salve o arquivo e agora você pode usar caminhos relativos a partir da raiz do projeto, como mostrado no exemplo abaixo:

```javascript
import database from "infra/database.js";
``` 