## GUIA COMPLETO - NVM for Windows

### 1. INSTALAÇÃO DO NVM

- Baixar o arquivo `nvm-setup.zip` de: https://github.com/coreybutler/nvm-windows/releases
- Executar o `nvm-setup.exe` como administrador
- Seguir o assistente de instalação

### 2. CONFIGURAÇÃO DAS VARIÁVEIS DE AMBIENTE (NECESSÁRIO TODA VEZ)

Para usar o NVM no VS Code, execute estes comandos em cada novo terminal:

```powershell
$env:NVM_HOME = "C:\Users\jeffe\AppData\Local\nvm"
$env:NVM_SYMLINK = "C:\nvm4w\nodejs"
$env:PATH = $env:PATH + ";C:\Users\jeffe\AppData\Local\nvm;C:\nvm4w\nodejs"
```

### 3. COMANDOS BÁSICOS DO NVM

#### Verificar instalação:

```powershell
nvm version                    # Mostra a versão do NVM
```

#### Listar versões:

```powershell
nvm list available             # Mostra todas as versões disponíveis para download
nvm list                       # Mostra versões já instaladas
```

#### Instalar versões:

```powershell
nvm install 20.19.1           # Instala uma versão específica
nvm install latest            # Instala a versão mais recente
nvm install lts               # Instala a versão LTS mais recente
```

#### Usar versões:

```powershell
nvm use 20.19.1               # Ativa uma versão específica
nvm current                   # Mostra qual versão está ativa
```

#### Verificar Node.js e NPM:

```powershell
node --version                # Versão do Node.js ativa
npm --version                 # Versão do NPM
```

### 4. ARQUIVO .nvmrc

- Criar arquivo `.nvmrc` na raiz do projeto
- Adicionar apenas a versão desejada: `20.19.1`
- Para usar: `nvm install 20.19.1` e `nvm use 20.19.1`

### 5. TORNAR PERMANENTE (OPCIONAL)

Para não precisar configurar as variáveis toda vez:

#### Método 1 - Perfil do PowerShell:

```powershell
# Criar perfil se não existir
if (!(Test-Path $PROFILE)) { New-Item -Type File -Path $PROFILE -Force }

# Abrir para edição
notepad $PROFILE
```

Adicionar no arquivo:

```powershell
$env:NVM_HOME = "C:\Users\jeffe\AppData\Local\nvm"
$env:NVM_SYMLINK = "C:\nvm4w\nodejs"
$env:PATH = $env:PATH + ";C:\Users\jeffe\AppData\Local\nvm;C:\nvm4w\nodejs"
```

#### Método 2 - Variáveis do Sistema:

```powershell
# Como administrador
[Environment]::SetEnvironmentVariable("NVM_HOME", "C:\Users\jeffe\AppData\Local\nvm", "User")
[Environment]::SetEnvironmentVariable("NVM_SYMLINK", "C:\nvm4w\nodejs", "User")
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
[Environment]::SetEnvironmentVariable("PATH", $currentPath + ";C:\Users\jeffe\AppData\Local\nvm;C:\nvm4w\nodejs", "User")
```

### 6. EXEMPLO DE USO COMPLETO

```powershell
# 1. Configurar ambiente (se necessário)
$env:NVM_HOME = "C:\Users\jeffe\AppData\Local\nvm"
$env:NVM_SYMLINK = "C:\nvm4w\nodejs"
$env:PATH = $env:PATH + ";C:\Users\jeffe\AppData\Local\nvm;C:\nvm4w\nodejs"

# 2. Instalar versão do .nvmrc
nvm install 20.19.1

# 3. Usar a versão
nvm use 20.19.1

# 4. Verificar se funcionou
node --version
npm --version
```

### 7. TROUBLESHOOTING

- **Erro "nvm não reconhecido"**: Execute os comandos de configuração do item 2
- **Node não encontrado**: Execute `nvm use [versão]` antes de usar o node
- **Reinstalar tudo**: Feche todos os terminais e abra novos após configurar

### 8. VERSÕES ÚTEIS

- **LTS Current**: 20.19.1 (recomendada para produção)
- **Latest**: 22.17.1 (mais recente)
- **Stable**: 18.17.0 (estável para projetos antigos)

### 9. INSTALANDO O `PRETTIER`

- **O que é a seção "scripts"?**: A seção scripts no package.json define comandos personalizados que você pode executar com `npm run [nome-do-script]`.

- **Rode o comando abaixo para installar o `Prettier`**

```powershell
npm install prettier -D
```

- **Alterar o arquivo `package.jason`**: Para dar permição.

```powershell
  "scripts": {
    "dev": "next dev",
    "lint:check": "prettier --check .",
    "lint:fix": "prettier --write ."
  }
```

- **"lint:check": "prettier --check ."**: O Prettier verifica se todos os arquivos do projeto estão formatados corretamente
- **"lint:fix": "prettier --write ."**: O Prettier corrige automaticamente a formatação de todos os arquivos

```powershell
npm run dev         # Roda seu projeto
npm run lint:check  # Verifica a formatação
npm run lint:fix    # Corrige a formatação
```
