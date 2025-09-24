<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Simple Blog API

Uma API RESTful para gerenciamento de blog construída com NestJS, Prisma ORM e PostgreSQL, incluindo sistema completo de tratamento de erros personalizados e documentação Swagger.

##  Tecnologias

- **NestJS** - Framework Node.js progressivo
- **Prisma ORM** - ORM moderno para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Docker & Docker Compose** - Containerização
- **Swagger/OpenAPI** - Documentação da API
- **Class Validator** - Validação de dados
- **TypeScript** - Linguagem tipada

##  Funcionalidades

###  **CRUD Completo**
- **Usuários**: Criar, listar, buscar, atualizar e deletar usuários
- **Posts**: Criar, listar, buscar, atualizar e deletar posts
- **Relacionamentos**: Posts vinculados aos usuários autores

### **Sistema de Tratamento de Erros**
- Interceptors personalizados para diferentes tipos de erro
- Conversão automática de erros Prisma para respostas HTTP
- Tratamento de erros de validação, conflitos e não encontrado

###  **Documentação Automática**
- Interface Swagger UI interativa
- Documentação automática dos endpoints
- Exemplos de requisições e respostas

###  **Validação de Dados**
- Validação automática de DTOs
- Sanitização de dados de entrada
- Mensagens de erro descritivas

##  Pré-requisitos

- **Docker** e **Docker Compose**
- **Node.js 18+** (se rodar localmente)
- **Git**

## Instalação e Execução

### **Opção 1: Docker (Recomendado)**

```bash
# 1. Clone o repositório
git clone https://github.com/PeSzpak/my-first-prisma.git
cd my-first-prisma/prisma-api

# 2. Suba os containers
docker-compose up --build

# 3. Aguarde a aplicação subir (pode levar alguns minutos na primeira vez)
# Acesse: http://localhost:3000
```

### **Opção 2: Execução Local**

```bash
# 1. Clone o repositório
git clone https://github.com/PeSzpak/my-first-prisma.git
cd my-first-prisma/prisma-api

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env.example .env
# Edite o .env com suas configurações de banco

# 4. Suba apenas o PostgreSQL
docker-compose up db -d

# 5. Execute as migrações
npx prisma migrate dev --name init

# 6. Gere o Prisma Client
npx prisma generate

# 7. Inicie a aplicação
npm run start:dev

# Acesse: http://localhost:3000
```

##  Documentação da API

Após iniciar a aplicação, acesse:

- **Swagger UI**: http://localhost:3000/api
- **JSON Schema**: http://localhost:3000/api-json
- **Health Check**: http://localhost:3000

##  Endpoints Principais

### **Usuários**
```http
GET    /users          # Listar todos os usuários
GET    /users/:id      # Buscar usuário por ID
POST   /users          # Criar novo usuário
PATCH  /users/:id      # Atualizar usuário
DELETE /users/:id      # Deletar usuário
```

### **Posts**
```http
GET    /posts          # Listar todos os posts
GET    /posts/:id      # Buscar post por ID
POST   /posts          # Criar novo post
PATCH  /posts/:id      # Atualizar post
DELETE /posts/:id      # Deletar post
```

##  Exemplos de Uso

### **Criar Usuário**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "admin": false
  }'
```

### **Criar Post**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu primeiro post",
    "content": "Conteúdo do post...",
    "authorEmail": "joao@email.com"
  }'
```

##  Estrutura do Projeto

```
src/
├── common/
│   └── filters/http-exception/errors/    # Sistema de tratamento de erros
├── prisma/                               # Configuração do Prisma
├── posts/                                # Módulo de Posts
│   ├── dto/                             # Data Transfer Objects
│   ├── entities/                        # Entidades
│   ├── repositories/                    # Camada de dados
│   └── ...
├── users/                               # Módulo de Usuários
│   ├── dto/
│   ├── entities/
│   ├── repositories/
│   └── ...
├── app.module.ts                        # Módulo principal
└── main.ts                             # Ponto de entrada
```

##  Tratamento de Erros

O sistema inclui interceptors personalizados que convertem erros internos em respostas HTTP apropriadas:

- **ConflictInterceptor**: Conflitos (409) - ex: email duplicado
- **NotFoundInterceptor**: Não encontrado (404)
- **DatabaseInterceptor**: Erros de banco de dados
- **UnauthorizedInterceptor**: Não autorizado (401)

##  Scripts Úteis

```bash
# Desenvolvimento
npm run start:dev          # Modo desenvolvimento com hot reload
npm run start:debug        # Modo debug

# Build e Produção
npm run build              # Build da aplicação
npm run start:prod         # Execução em produção

# Testes
npm run test               # Testes unitários
npm run test:e2e           # Testes end-to-end
npm run test:cov           # Cobertura de testes

# Prisma
npx prisma studio          # Interface visual do banco
npx prisma migrate dev     # Executar migrações
npx prisma generate        # Gerar cliente Prisma
```

##  Testando a API

1. **Via Swagger UI**: http://localhost:3000/api
2. **Via cURL**: Use os exemplos acima
3. **Via Postman**: Importe a collection do OpenAPI
4. **Via Prisma Studio**: http://localhost:5555 (se habilitado)

##  Deploy

Para produção, ajuste as variáveis de ambiente e utilize:

```bash
npm run build
npm run start:prod
```

##  Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido usando NestJS + Prisma**
