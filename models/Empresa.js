import mongoose from 'mongoose';

const empresaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
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
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  facturacion: {
    type: String,
    default: null,
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
