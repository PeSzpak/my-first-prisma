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

A RESTful API for blog management built with NestJS, Prisma ORM, and PostgreSQL, featuring a complete custom error handling system and Swagger documentation.

## Technologies

- **NestJS** - Progressive Node.js framework
- **Prisma ORM** - Modern ORM for TypeScript
- **PostgreSQL** - Relational database
- **Docker & Docker Compose** - Containerization
- **Swagger/OpenAPI** - API documentation
- **Class Validator** - Data validation
- **TypeScript** - Typed language

## Features

### **Complete CRUD Operations**
- **Users**: Create, list, fetch, update, and delete users
- **Posts**: Create, list, fetch, update, and delete posts
- **Relationships**: Posts linked to author users

### **Error Handling System**
- Custom interceptors for different error types
- Automatic conversion of Prisma errors to HTTP responses
- Handling of validation, conflict, and not found errors

### **Automatic Documentation**
- Interactive Swagger UI interface
- Automatic endpoint documentation
- Request and response examples

### **Data Validation**
- Automatic DTO validation
- Input data sanitization
- Descriptive error messages

## Prerequisites

- **Docker** and **Docker Compose**
- **Node.js 18+** (if running locally)
- **Git**

## Installation and Execution

### **Option 1: Docker (Recommended)**

```bash
# 1. Clone the repository
git clone https://github.com/PeSzpak/my-first-prisma.git
cd my-first-prisma/prisma-api

# 2. Start containers
docker-compose up --build

# 3. Wait for the application to start (may take a few minutes on first run)
# Access: http://localhost:3000
```

### **Option 2: Local Execution**

```bash
# 1. Clone the repository
git clone https://github.com/PeSzpak/my-first-prisma.git
cd my-first-prisma/prisma-api

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your database settings

# 4. Start PostgreSQL only
docker-compose up db -d

# 5. Run migrations
npx prisma migrate dev --name init

# 6. Generate Prisma Client
npx prisma generate

# 7. Start the application
npm run start:dev

# Access: http://localhost:3000
```

## API Documentation

After starting the application, access:

- **Swagger UI**: http://localhost:3000/api
- **JSON Schema**: http://localhost:3000/api-json
- **Health Check**: http://localhost:3000

## Main Endpoints

### **Users**
```http
GET    /users          # List all users
GET    /users/:id      # Get user by ID
POST   /users          # Create new user
PATCH  /users/:id      # Update user
DELETE /users/:id      # Delete user
```

### **Posts**
```http
GET    /posts          # List all posts
GET    /posts/:id      # Get post by ID
POST   /posts          # Create new post
PATCH  /posts/:id      # Update post
DELETE /posts/:id      # Delete post
```

## Usage Examples

### **Create User**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Silva",
    "email": "john@email.com",
    "admin": false
  }'
```

### **Create Post**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first post",
    "content": "Post content...",
    "authorEmail": "john@email.com"
  }'
```

## Project Structure

```
src/
├── common/
│   └── filters/http-exception/errors/    # Error handling system
├── prisma/                               # Prisma configuration
├── posts/                                # Posts module
│   ├── dto/                             # Data Transfer Objects
│   ├── entities/                        # Entities
│   ├── repositories/                    # Data layer
│   └── ...
├── users/                               # Users module
│   ├── dto/
│   ├── entities/
│   ├── repositories/
│   └── ...
├── app.module.ts                        # Main module
└── main.ts                             # Entry point
```

## Error Handling

The system includes custom interceptors that convert internal errors to appropriate HTTP responses:

- **ConflictInterceptor**: Conflicts (409) - e.g., duplicate email
- **NotFoundInterceptor**: Not found (404)
- **DatabaseInterceptor**: Database errors
- **UnauthorizedInterceptor**: Unauthorized (401)

## Useful Scripts

```bash
# Development
npm run start:dev          # Development mode with hot reload
npm run start:debug        # Debug mode

# Build and Production
npm run build              # Build application
npm run start:prod         # Production execution

# Tests
npm run test               # Unit tests
npm run test:e2e           # End-to-end tests
npm run test:cov           # Test coverage

# Prisma
npx prisma studio          # Visual database interface
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate Prisma client
```

## Testing the API

1. **Via Swagger UI**: http://localhost:3000/api
2. **Via cURL**: Use the examples above
3. **Via Postman**: Import the OpenAPI collection
4. **Via Prisma Studio**: http://localhost:5555 (if enabled)

## Deploy

For production, adjust environment variables and use:

```bash
npm run build
npm run start:prod
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Built with NestJS + Prisma**
