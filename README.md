# URL Appender

A TypeScript project for appending parameters to URLs, with a Node.js backend and simple frontend interface.

## Project Overview

This project is written entirely in TypeScript, using:
- **Backend**: Node.js with Express middleware
- **Database**: SQLite (using better-sqlite3 package)
- **Documentation**: Self-documented with OpenAPI/Swagger

## Project Structure

### Backend (`/src`)
- `index.ts` - Root Express application
- `/db` - Database code
- `/docs` - Contains `swagger.ts` for API documentation
- `/routes` - API routes
  - `links.ts` - Endpoints for getting all links and appending parameters

### Frontend
Simple UI built with:
- Vanilla JavaScript
- Tailwind CSS
- Main files:
  - `index.html` - Contains all UI markup
  - `app.ts` - Minimal JavaScript functionality

## Running The Application

### Backend API

```bash
# Build the code
npm run build

# Run the API server
npm run start
```

### Frontend UI

```bash
# Compile TypeScript to JavaScript
npm run compile

# Serve the UI
npm run serve
```

## Docker Support

A Dockerfile is included for containerizing the API.

```bash
# Build a Docker image
docker build -t "image-name" .

# Example
docker build -t "LinkAppendTestEnv" .
```

## API Documentation

The API is documented using OpenAPI/Swagger, making it easy to explore the available endpoints and functionality.