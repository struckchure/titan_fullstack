# Titans Fullstack Project

A modern fullstack application built with NestJS backend and React frontend, featuring real-time regex pattern validation against input, MongoDB integration, and other real-time capabilities.

## Project Structure

```
├── backend/         # NestJS backend server
├── frontend/        # React frontend application
└── docker-compose.yaml  # Docker configuration
```

## Backend (NestJS)

The backend is built with NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

### Tech Stack

- NestJS (TypeScript-based Node.js framework)
- Prisma (ORM)
- MongoDB (Database)
- WebSocket integration

### Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables:

   - Create a `.env` file based on provided example
   - Configure database connection

4. Start the development server:
   ```bash
   yarn start:dev
   ```

## Frontend (React)

The frontend is a modern React application built with Vite and TypeScript.

### Tech Stack

- React
- TypeScript
- Vite (Build tool)
- WebSocket client

### Setup Instructions

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables:

   - Create a `.env` file based on provided example
   - Configure API endpoints

4. Start the development server:
   ```bash
   yarn dev
   ```

## Docker Setup

The project includes Docker configuration for easy deployment:

1. Build and start all services:

   ```bash
   docker-compose up -d
   ```

> The frontend is accessible on port `3000`

2. Stop all services:
   ```bash
   docker-compose down
   ```

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
