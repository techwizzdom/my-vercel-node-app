const express = require("express")
const swaggerUi = require("swagger-ui-express")
const app = express()
const port = process.env.PORT || 3000

// OpenAPI specification
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "My Vercel Node App API",
    version: "1.0.0",
    description: "A simple API to get users",
  },
  servers: [
    {
      url: "https://my-vercel-node-app.vercel.app",
    },
  ],
  paths: {
    "/api/get-users": {
      get: {
        summary: "Get users",
        responses: {
          200: {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        example: 1,
                      },
                      name: {
                        type: "string",
                        example: "John Doe",
                      },
                      email: {
                        type: "string",
                        example: "john.doe@example.com",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" })
})

// /api/get-users endpoint
app.get("/api/get-users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com" },
  ]
  res.json(users)
})

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
