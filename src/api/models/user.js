const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true, select: false }, // select: false = no mostrará el password cuando convirtamos el modelo a objeto JSON.
    rol: {
      type: String,
      required: true,
      default: 'user',
      enum: ['admin', 'user']
    }
    // El orden en que Mongoose trabaja:
    // 1. Mira si le hemos pasado el valor
    // 2. En caso negativo, mira si hay un "default" y lo aplica
    // 3. Comprueba si es "required"
    // Por eso, si el usuario hace un register y no nos pasa ningún "rol", aunque sea un campo "required", funcionará.
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    // .isModified('nombre_del_campo') es un metodo nativo (built-in)
    return next()
  } // Este bloque if evita la doble encriptación en controladores como "changeRole" (que usan .save() para editar).
  // Si usáramos findByIdAndUpdate (como en updateUser), este middleware se saltaría directamente.
  // Pero al usar .save() para editar otros campos (como el rol), esta comprobación es vital para no romper la contraseña existente.

  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = mongoose.model('users', userSchema, 'users')

module.exports = User
