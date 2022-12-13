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
    type: String,
    required: true,
    default: 'user',
    trim: true,
  },
  // TO DO agregar las referencias correspondientes.
  entradas: [{
    type: mongoose.Types.ObjectId,
    ref: 'x',
  }],
  infoSalida: [{
    type: mongoose.Types.ObjectId,
    ref: 'x',
  }],
  asignacionTareas: [{
    type: mongoose.Types.ObjectId,
    ref: 'x',
  }],

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
