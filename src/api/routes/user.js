const { isAuth, isAuthorizedToDeleteUsers, isAdmin } = require("../../middlewares/auth");
const { register, login, deleteUser, getUsers, changeRole } = require("../controllers/user");

const usersRoutes = require("express").Router();

usersRoutes.get("/", isAuth, getUsers)
usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.delete("/:id", [isAuth, isAuthorizedToDeleteUsers], deleteUser);
usersRoutes.patch("/:id/role", [isAuth, isAdmin], changeRole);

module.exports = usersRoutes;