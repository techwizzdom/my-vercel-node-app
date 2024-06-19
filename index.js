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
const { useTreblle } = require("treblle")

useTreblle(app, {
  apiKey: "LUGSKrOTLUY1q0EdxOLVwSPyMp4KGP2m",
  projectId: "i9IuJ6ZXfUYADC8g",
})

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

// /api/get-products endpoint
app.get("/api/get-products", (req, res) => {
  const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Phone", price: 800 },
    { id: 3, name: "Tablet", price: 600 },
  ]
  res.json(products)
})

// /api/get-orders endpoint
app.get("/api/get-orders", (req, res) => {
  const orders = [
    { id: 1, product: "Laptop", quantity: 2, total: 2400 },
    { id: 2, product: "Phone", quantity: 1, total: 800 },
    { id: 3, product: "Tablet", quantity: 3, total: 1800 },
  ]
  res.json(orders)
})

// /api/get-comments endpoint
app.get("/api/get-comments", (req, res) => {
  const comments = [
    { id: 1, user: "John Doe", comment: "Great product!" },
    { id: 2, user: "Jane Smith", comment: "Fast shipping." },
    { id: 3, user: "Alice Johnson", comment: "Excellent customer service." },
  ]
  res.json(comments)
})

// /api/get-posts endpoint
app.get("/api/get-posts", (req, res) => {
  const posts = [
    {
      id: 1,
      title: "My First Post",
      content: "This is the content of my first post.",
    },
    { id: 2, title: "Another Post", content: "Here is some more content." },
    { id: 3, title: "Yet Another Post", content: "And even more content." },
  ]
  res.json(posts)
})

// /api/get-categories endpoint
app.get("/api/get-categories", (req, res) => {
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Books" },
    { id: 3, name: "Clothing" },
  ]
  res.json(categories)
})

// /api/get-tasks endpoint
app.get("/api/get-tasks", (req, res) => {
  const tasks = [
    { id: 1, title: "Do laundry", completed: false },
    { id: 2, title: "Buy groceries", completed: true },
    { id: 3, title: "Clean house", completed: false },
  ]
  res.json(tasks)
})

// /api/get-messages endpoint
app.get("/api/get-messages", (req, res) => {
  const messages = [
    { id: 1, from: "John Doe", message: "Hello there!" },
    { id: 2, from: "Jane Smith", message: "Hi, how are you?" },
    { id: 3, from: "Alice Johnson", message: "Good morning!" },
  ]
  res.json(messages)
})

// /api/get-notifications endpoint
app.get("/api/get-notifications", (req, res) => {
  const notifications = [
    { id: 1, type: "Email", content: "You have a new email from John Doe." },
    { id: 2, type: "SMS", content: "Your package has been delivered." },
    { id: 3, type: "Alert", content: "Your battery is low." },
  ]
  res.json(notifications)
})

// /api/get-reviews endpoint
app.get("/api/get-reviews", (req, res) => {
  const reviews = [
    { id: 1, product: "Laptop", review: "Amazing performance!", rating: 5 },
    { id: 2, product: "Phone", review: "Good value for the price.", rating: 4 },
    {
      id: 3,
      product: "Tablet",
      review: "Battery life could be better.",
      rating: 3,
    },
  ]
  res.json(reviews)
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
