const mongoose = require('mongoose');

const empresaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  tipoEmpresa: {
    type: String,
    required: true,
    enum: ['logistica', 'constructora'],
  },
  habilitado: {
    type: Boolean,
    default: false,
  },
  direccion: {
    type: String,
    required: true,
    trim: true,
  },
  facturacion: {
    type: String, // ? type?
    default: null,
    trim: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
});

const Empresa = mongoose.model('Empresa', empresaSchema);

module.exports = Empresa;
