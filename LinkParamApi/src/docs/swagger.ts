import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Link Parameter API',
      version: '1.0.0',
      description: 'Service that appends query parameters to any URL.'
    }
  },
  // Tell swagger‑jsdoc where to look for route files
  apis: ['src/routes/*.ts']
};