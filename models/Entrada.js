import mongoose from 'mongoose';

const entradaSchema = mongoose.Schema({
  fechaHora: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  latitud: {
    type: String,
    required: false,
  },
  longitud: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Entrada = mongoose.model('Entrada', entradaSchema);

export default Entrada;
