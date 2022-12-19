const mongoose = require('mongoose');

const entradaSchema = mongoose.Schema({
  fechaHora: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  latitud: {
    type: String,
    required: true,
  },
  longitud: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Entrada = mongoose.model('Entrada', entradaSchema);

module.exports = Entrada;
