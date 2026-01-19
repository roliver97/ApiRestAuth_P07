const { isAuth, isAdmin } = require("../../middlewares/auth");
const { postAuthor, getAuthors, deleteAuthor, updateAuthor } = require("../controllers/author");


const authorsRoutes = require("express").Router();

authorsRoutes.get("/", getAuthors)
authorsRoutes.post("/", isAuth, postAuthor);
authorsRoutes.delete("/:id", isAdmin, deleteAuthor);
authorsRoutes.put("/:id", isAdmin, updateAuthor);

module.exports = authorsRoutes;