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
  // TO DO agregar la referencia de asignacionTareas
  entradas: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Entrada', //  ! espero este consistente la ref
    },
  ],
  infoSalida: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'InfoSalida', // ! espero este consistente la ref
    },
  ],
  asignacionTareas: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'x',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
