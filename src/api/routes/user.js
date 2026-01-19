const { isAuth, isAdmin, isAdminOrSelf } = require("../../middlewares/auth");
const { register, login, deleteUser, getUsers, changeRole, updateUser } = require("../controllers/user");

const usersRoutes = require("express").Router();

usersRoutes.get("/", isAuth, getUsers)
usersRoutes.post("/register", register);
usersRoutes.post("/login", login);
usersRoutes.delete("/:id", [isAuth, isAdminOrSelf], deleteUser);
usersRoutes.patch("/:id/role", [isAuth, isAdmin], changeRole);
usersRoutes.put("/:id", [isAuth, isAdminOrSelf], updateUser)

module.exports = usersRoutes;