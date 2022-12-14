const mongoose = require('mongoose');

const TareasSchema = mongoose.Schema({
  fechaHora: {
    type: Date,
    required: true,
    default: new Date(),
  },
  // TO DO agregar las referencias correspondientes.
  nombre: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  obra: {
    type: String,
    required: true,
  },
  tarea: {
    type: String,
    required: true,
  },
  userId: [{
    type: mongoose.Types.ObjectId,
    required: true,
    red: 'User',
  }],
  isSucces: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Tarea = mongoose.model('Tarea', TareasSchema);
module.exports = Tarea;
