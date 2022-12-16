import mongoose from 'mongoose';

const empresaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  isLogistica: {
    type: Boolean,
    required: true,
    default: false,
  },
  isConstructora: {
    type: Boolean,
    required: true,
    default: false,
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

export default Empresa;
