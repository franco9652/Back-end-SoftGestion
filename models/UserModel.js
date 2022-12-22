const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  image: {
    type: String,
    required: false,
  },
  dni: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    required: true,
    default: false,
    trim: true,
  },
  entradaSalida: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Entrada',
    },
  ],
  asignacionTareas: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Tarea',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
