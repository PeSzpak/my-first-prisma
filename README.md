# Simple Blog API (my-first-prisma)

My first project with Prisma ORM: a NestJS REST API for users and blog posts on PostgreSQL, with a repository layer, Prisma error mapping to HTTP status codes and Swagger docs.

![Swagger UI of the API running locally](docs/media/swagger-overview.webp)

## Features

- CRUD for users (`/users`) and posts (`/posts`).
- A post is linked to its author by **email** (`authorEmail`); an unknown email returns 404 `Author not found.`
- Unique email on users: Prisma error `P2002` becomes `409 A record with this email already exists`.
- Global `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`): unknown fields return 400.
- Swagger UI at `/api`, generated from the DTOs by the `@nestjs/swagger` CLI plugin.

## How it works

```mermaid
flowchart LR
  C[HTTP client] --> V[ValidationPipe]
  V --> CT[Users / Posts controllers]
  CT --> S[Services]
  S --> R[Repositories]
  R --> P[PrismaService]
  P --> DB[(PostgreSQL)]
  R -. throws NotFoundError / Prisma errors .-> I[Global interceptors]
  I -. 404 / 409 / 401 / 500 .-> C
```

The repositories throw domain errors (`NotFoundError`, `UnauthorizedError`) or let Prisma errors bubble up. Four global interceptors in `src/common/filters/http-exception/errors/interceptors` turn them into HTTP responses: `ConflictInterceptor` (409), `NotFoundInterceptor` (404), `UnauthorizedInterceptor` (401) and `DatabaseInterceptor` (Prisma errors, via `handle-database-errors.utils.ts`).

Data model (`prisma/schema.prisma`):

```mermaid
erDiagram
  user ||--o{ post : writes
  user {
    int id PK
    string email UK
    string name
    boolean admin
    datetime createdAt
  }
  post {
    int id PK
    boolean published
    varchar title
    string content
    datetime createdAt
    datetime updateAt
    int authorId FK
  }
```

## Stack

NestJS 11, TypeScript, Prisma 6, PostgreSQL, class-validator, @nestjs/swagger, Docker Compose, Jest.

## Running locally

Prerequisites: Node.js 20+, Docker.

```bash
npm install
cp .env.example .env                 # DATABASE_URL matches the db service in docker-compose.yml
docker compose up -d db              # PostgreSQL on port 5432
npx prisma migrate deploy            # applies prisma/migrations
npm run start:dev                    # http://localhost:3000
```

Run `npx prisma generate` after editing the schema. `npx prisma studio` opens a data browser on port 5555.

| Variable | Example | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | `postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public` | Prisma connection |
| `PORT` | `3000` | API port (default 3000) |

With Docker only: `docker compose up --build` starts the database and the app (dev mode, port 3000). Apply the migrations once with `docker compose exec app npx prisma migrate deploy`.

Production build: `npm run build && npm run start:prod`.

## API

| Method | Route | Description | Responses |
| --- | --- | --- | --- |
| GET | `/` | hello world | 200 |
| POST | `/users` | create user (`name`, `email`, `admin`) | 201, 400, 409 |
| GET | `/users` | list users | 200 |
| GET | `/users/:id` | get user with posts | 200, 404 |
| PATCH | `/users/:id` | partial update | 200, 400 |
| DELETE | `/users/:id` | delete | 200 |
| POST | `/posts` | create post (`title`, `content?`, `authorEmail`) | 201, 400, 404 |
| GET | `/posts` | list posts with author name | 200 |
| GET | `/posts/:id` | get post with author name and email (empty body if missing) | 200 |
| PATCH | `/posts/:id` | partial update, can move to another author by `authorEmail` | 200, 400, 404 |
| DELETE | `/posts/:id` | delete | 200 |

`published` exists in the schema but is not in the DTOs, so the API cannot change it (sending it returns 400).

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" \
  -d '{"name": "Ana Example", "email": "ana@example.com", "admin": false}'

curl -X POST http://localhost:3000/posts -H "Content-Type: application/json" \
  -d '{"title": "My first post", "content": "Testing Prisma with NestJS.", "authorEmail": "ana@example.com"}'
```

API documentation:

- Swagger UI: `http://localhost:3000/api` (JSON at `/api-json`).
- OpenAPI 3 file: [`docs/openapi.json`](docs/openapi.json), exported from `/api-json`. Open it in [editor.swagger.io](https://editor.swagger.io).
- Postman: import [`docs/postman/my-first-prisma.postman_collection.json`](docs/postman/my-first-prisma.postman_collection.json). `baseUrl` defaults to `http://localhost:3000`; "Create user" and "Create post" save `userId` and `postId` for the other requests.

![Swagger running GET /posts](docs/media/swagger-get-posts.webp)

## Project structure

```
prisma/
├── schema.prisma
└── migrations/                 # init migration (user, post)
src/
├── main.ts                     # Swagger at /api, ValidationPipe, global interceptors
├── prisma/prisma.service.ts    # PrismaClient as a Nest provider
├── users/                      # controller, service, repository, DTOs, entity
├── posts/                      # controller, service, repository, DTOs, entity
└── common/filters/http-exception/errors/
    ├── interceptors/           # error -> HTTP status
    ├── types/                  # NotFoundError, ConflictError, UniqueConstraintError...
    └── utils/                  # Prisma error detection and mapping
docs/                           # openapi.json, Postman collection, screenshots
```

## Tests

```bash
npm test
```

Only the generated `app.controller` and `prisma.service` specs pass today. The users/posts specs fail to load because Jest has no mapping for the `src/...` import paths used in the repositories.
