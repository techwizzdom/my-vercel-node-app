const express = require("express")
const path = require("path")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json") // Ensure this file exists with your API documentation
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist")
const app = express()
const port = process.env.PORT || 3000

// Serve static files from swagger-ui-dist
app.use(
  "/api-docs",
  express.static(path.join(__dirname, "node_modules/swagger-ui-dist"))
)
app.get("/api-docs", (req, res) => {
  res.sendFile(path.join(__dirname, "node_modules/swagger-ui-dist/index.html"))
})

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send("Sorry, page not found")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})
