import mongoose from 'mongoose';

const infoSalidaSchema = mongoose.Schema({
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
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
});

const InfoSalida = mongoose.model('InfoSalida', infoSalidaSchema);

export default InfoSalida;
