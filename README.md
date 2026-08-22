# MeshAI

MeshAI is a full-stack AI assistant application. Users can upload documents to a knowledge base and ask questions about them through a chat interface.

**Live:** https://meshai-olga.mooo.com

## Tech stack

- React
- TypeScript
- Express
- MongoDB
- Docker
- Caddy
- AWS EC2
- GitHub Actions

## Getting started

Prerequisites:

- Node.js 20+
- Docker
- Docker Compose

### Run locally

1. Clone the repository.

```bash
git clone https://github.com/heyolyastone/ai-se_project_mesh-ai.git
cd ai-se_project_mesh-ai
```

2. Install dependencies.

```bash
npm run install:all
```

3. Create a `.env` file from `.env.example`.

```bash
cp .env.example .env
```

4. Fill in the required environment variables in `.env`.

5. Start the app in development mode.

```bash
npm run dev
```

6. To run the full Docker stack locally, use:

```bash
docker compose up --build
```

The app will be available at:

```text
http://localhost
```

## Required environment variables

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign authentication tokens |
| `NEBIUS_API_KEY` | API key for the Nebius AI service |
| `SITE_ADDRESS` | Domain name used by Caddy for local or production routing |

## Deployment

The application is deployed on AWS EC2 using Docker Compose. Caddy is used as the reverse proxy and serves the app over HTTPS.

Production URL:

```text
https://meshai-olga.mooo.com
```

## CI/CD

GitHub Actions is used to validate the client and server. The CI workflow runs build and lint checks for both parts of the application.
