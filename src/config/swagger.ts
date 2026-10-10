import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Angler API',
            version: '1.0.0',
            description: 'REST API for managing anglers, fishing sessions, and catches',
        },
        servers: [
            {
                url: "/api/v1",
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                },
            },
        },
        security: [{ ApiKeyAuth: [] }],
    },
    apis: ['./src/controllers/*.ts', './src/models/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);