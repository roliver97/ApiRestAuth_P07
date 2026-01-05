require("dotenv").config();

const express = require("express");
const { connectDB } = require("./src/config/db");
const usersRoutes = require("./src/api/routes/user");
const booksRoutes = require("./src/api/routes/book");
const authorsRoutes = require("./src/api/routes/author");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/books", booksRoutes)
app.use("/api/v1/authors", authorsRoutes)

app.use(   (req, res, next) => {
  return res.status(404).json("Route not found")
})

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`)
})