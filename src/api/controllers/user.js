const { generateSign } = require("../../config/jwt");
const Book = require("../models/book");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
    })

    const userDuplicated = await User.findOne({ userName: req.body.userName });
    
    if(userDuplicated){
      return res.status(400).json("Ese nombre de usuario ya existe")
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved)

  } catch (error) {
      console.error("Error al crear el usuario:", error);
      return res.status(400).json( { message: `Error al crear el usuario: ${error.message}`}); 
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({userName: req.body.userName});
     
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)){
        const token = generateSign(user._id);
        return res.status(200).json({user, token})
      } else {
        return res.status(400).json("El usuario o la contraseña son incorrectos");
      }
    } else {
        return res.status(400).json("El usuario o la contraseña son incorrectos");
    }

  } catch (error) {
      console.error("Error en el login del usuario:", error);
      return res.status(400).json( { message: `Error en el login del usuario: ${error.message}`}); 
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Book.deleteMany({ postedBy: id });

    const userDeleted = await User.findByIdAndDelete(id);
      
      if (!userDeleted) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

    return res.status(200).json({
      mensaje: "Este usuario ha sido eliminado", 
      userDeleted
    });
  } 
  catch (error) {
      console.error("Error al eliminar el usuario:", error);
      return res.status(400).json( { message: `Error al eliminar el usuario: ${error.message}`}); 
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
      console.error("Error al obtener los usuario:", error);
      return res.status(400).json( { message: `Error al obtener los usuario: ${error.message}`}); 
  }
}

const changeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    if(user.rol === "user") {
      user.rol = "admin";
      const updatedUser = await user.save();

      return res.status(200).json({ message: "El rol del usuario ha sido actualizado con éxito", user: updatedUser})
      } else {
      return res.status(409).json("Este usuario ya es administrador");
    }
  } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
      return res.status(400).json( { message: `Error al cambiar el rol del usuario: ${error.message}`}); 
  }
}

const updateUser = async (req, res, next) => {
    try {
    const { id } = req.params;

    if (req.body.rol) {
        return res.status(400).json("No puedes actualitzar tu rol aquí");
    }

    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10); // Con el update tenemos que encriptar manualmente la contraseña ya que es un proceso que no pasa por el userSchema del modelo y por lo tanto no ejecuta la funcion .pre("save")
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
        return res.status(404).json("Usuario no encontrado");
    }

    return res.status(200).json({
      mensaje: "Los datos de este usuario han sido actualizados", 
      updatedUser
    });
  } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
      return res.status(400).json( { message: `Error al actualizar los datos del usuario: ${error.message}`}); 
  }
}

module.exports = { register, login, deleteUser, getUsers, changeRole, updateUser }