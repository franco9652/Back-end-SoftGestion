import mongoose from 'mongoose';

const infoSalidaSchema = mongoose.Schema({
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

const InfoSalida = mongoose.model('InfoSalida', infoSalidaSchema);

export default InfoSalida;
