const User = require("../api/models/user");
const { verifyJwt } = require("../config/jwt");

const isAuth = async (req, res, next) => { 
  try {
    const token = req.headers.authorization;

    if(!token) {
      return res.status(401).json("No estás autorizado. Token invalido o expirado");
    }

    const parsedToken = token.replace("Bearer ", "");
    const { user_id } = verifyJwt(parsedToken);
    const user = await User.findById(user_id);

    if (!user) {
        return res.status(401).json("Usuario no encontrado");
    }

    user.password = null;
    req.user = user;
    next();

  } catch (error) {
    console.error("Error en middleware isAuth:", error);
    return res.status(500).json({ message: `Error interno de autorización: ${error.message}` });
 }
}

const isAdmin = async (req, res, next) => {  // Como primero ejecutaremos el middleware isAuth, este guardará los datos de autenticación dentro de req.user, así que en las siguientes funciones (como isAdmin o isAuthorizedToDeleteUsers) podremos usar directamente req.user para saber si está autenticado o no.
 try {
   if(!req.user) {
      return res.status(401).json("No estás autorizado. Token invalido o expirado");
    }

    if(req.user.rol === "admin") {
        next();
    } else {
        return res.status(403).json("Acceso denegado. Se requieren permisos de administrador");
    }
  } catch (error) {
    console.error("Error en middleware isAdmin:", error);
    return res.status(500).json({ message: `Error interno de autorización: ${error.message}` });
 }
}

const isAdminOrSelf = async (req, res, next) => { // Como primero ejecutaremos el middleware isAuth, este guardará los datos de autenticación dentro de req.user, así que en las siguientes funciones (como isAdmin o isAuthorizedToDeleteUsers) podremos usar directamente req.user para saber si está autenticado o no.
  try {
    if (!req.user) {
        return res.status(401).json("Usuario no autenticado");
    }

    const idToDelete = req.params.id;
    const isAdmin = req.user.rol === "admin";
    const isSelf = req.user._id.toString() === idToDelete;

    if (isAdmin || isSelf) {
      next();
    } else {
      return res.status(403).json("No tienes permiso para realizar esta acción");
    }  
  } catch (error) {
    console.error("Error en middleware isAdminOrSelf:", error);
    return res.status(500).json({ message: `Error interno de autorización: ${error.message}` });
 }
}

module.exports = { isAuth, isAdmin, isAdminOrSelf }