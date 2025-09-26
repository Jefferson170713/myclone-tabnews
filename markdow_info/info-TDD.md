## GUIA TDD - TESTES AUTOMATIZADOS

### 1. INSTALAR O `JEST` para Testes automatizados.

- O `Jest` é um framework de testes automatizados para aplicações JavaScript, criado pelo Facebook. Ele permite testar funções, componentes e integrações de forma simples, rápida e com relatórios claros. É muito usado em projetos Node.js e React por sua facilidade de configuração e recursos como mocks, snapshots e cobertura de código.

- Mas vamos instalar na versão 29.6.2 e já instalando nas dependências do nosso projeto.

  ```bash
  npm install --save--dev jest@29.6.2
  ```
- Agora vamos no arquivo **`package.json`** e adicionar, junto com as dependências que temos `"test": "jest"` e `"test": "jest --watch"`:

  ```json
  "scripts": {
    "dev": "next dev",
    "lint:check": "prettier --check .",
    "lint:fix": "prettier --write .",
    "test": "jest", 
    "test:watch": "jest --watch"
  }
  ```
  - Com o comando de `test:watch` o `Jest` fica em modo vigilante e para sair do comando digite `q`.

  ```bash
  npm run test:watch
  ```
  - **PARA TESTAR VAMOS EXECUTAR O COMANDO**:

  ```bash
  npm run test
  ```

- Para visualizar quais versões o `Jest` tem disponível, execute:

  ```bash
  npm view jest versions
  ```
  - O Comando acima mostrará todas as versões.

- Para ver qual versão do `Jest` está usando.

  ```bash
    npm view jest versions
  ```

- Para instalar o Jest como dependência de desenvolvimento, execute:
  
  ```bash
  npm install jest -D
  ```

- Para adicionar um script de teste no `package.json`:
  
  ```json
  "scripts": {
    "test": "jest"
  }
  ```

- Para rodar os testes, utilize:
  
  ```bash
  npm test
  ```

- Recomenda-se criar arquivos de teste com o sufixo `.test.js` ou `.spec.js`.