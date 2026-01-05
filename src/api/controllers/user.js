const { generateSign } = require("../../config/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt")

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: "user"
    })

    const userDuplicated = await User.findOne({ userName: req.body.userName });
    
    if(userDuplicated){
      return res.status(400).json("Ese nombre de usuario ya existe")
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved)

  } catch (error) {
    return res.status(400).json(error);
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
    return res.status(400).json(error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Este usuario ha sido eliminado", 
      userDeleted
    });
  } catch (error) {
    return res.status(400).json(error);
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
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
    return res.status(404).json("Este usuario no existe");
  }
}

module.exports = { register, login, deleteUser, getUsers, changeRole }