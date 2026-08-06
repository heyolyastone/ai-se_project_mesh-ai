# MeshAI Server

This is the backend for the MeshAI full-stack application.

## Features

- User registration and login
- JWT-based authentication
- Protected API routes
- Document upload
- PDF text processing
- Document chunking and embeddings
- Chat and message persistence
- AI-powered answers based on uploaded documents

## Development

Install dependencies:

npm install

Create a .env file in the server directory with:

NEBIUS_API_KEY=your-key-goes-here
JWT_SECRET=your-secret-goes-here
MONGO_URI=your-mongodb-uri
PORT=3000

Run the development server:

npm run dev

Build the project:

npm run build

Run lint:

npm run lint
