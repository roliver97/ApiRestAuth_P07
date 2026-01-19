const { isAuth, isAdmin } = require("../../middlewares/auth");
const { postBook, getBooks, deleteBook, updateBook } = require("../controllers/book");


const booksRoutes = require("express").Router();

booksRoutes.get("/", getBooks)
booksRoutes.post("/", isAuth, postBook);
booksRoutes.delete("/:id", isAdmin, deleteBook);
booksRoutes.put("/:id", isAdmin, updateBook);

module.exports = booksRoutes;