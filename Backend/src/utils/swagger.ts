import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "User Authentication API",
    version: "1.0.0",
    description:
      "API for user authentication, registration, and token management",
  },
  servers: [
    {
      url: "http://localhost:8080/",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  // security: [
  //   {
  //     BearerAuth: [],
  //   },
  // ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: express.Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export { swaggerSpec };
