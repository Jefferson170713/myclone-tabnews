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

### 2. Explicação da Pirâmide de Testes

A Pirâmide de Testes é um conceito fundamental em desenvolvimento de software que orienta a distribuição e o foco dos testes automatizados em diferentes níveis. Ela sugere que a maior parte dos testes deve ser composta por testes unitários, seguidos por uma quantidade menor de testes de integração e, por fim, uma quantidade ainda menor de testes de interface (end-to-end).

**Estrutura da Pirâmide:**

- **Base (Testes Unitários):**
  - Testam pequenas partes isoladas do código, como funções ou métodos.
  - São rápidos, baratos e fáceis de manter.
  - Exemplo: testar uma função de soma.

- **Meio (Testes de Integração): Ou Service**
  - Verificam se diferentes módulos ou componentes funcionam bem juntos.
  - Podem envolver banco de dados, APIs ou múltiplas partes do sistema.
  - Exemplo: testar se um serviço consegue salvar e recuperar dados corretamente.

- **Topo (Testes End-to-End): Ou UI**
  - Simulam o comportamento do usuário na aplicação completa.
  - São mais lentos, complexos e custosos de manter.
  - Exemplo: testar o fluxo de login do usuário na interface.

**Resumo:**

A pirâmide sugere priorizar testes unitários, pois são mais rápidos e baratos, garantindo uma base sólida. Testes de integração validam a comunicação entre partes do sistema. Testes end-to-end são importantes, mas devem ser usados com moderação devido ao custo e complexidade.

-
