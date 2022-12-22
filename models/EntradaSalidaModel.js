const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     EntradaSalida:
 *       type: object
 *       properties:
 *         tipo:
 *           type: string
 *           enum: [entrada, salida]
 *           required: true
 *         fechaHora:
 *           type: string
 *           format: date-time
 *           required: true
 *         latitud:
 *           type: string
 *           required: true
 *           example: 12345
 *         longitud:
 *           type: string
 *           required: true
 *           example: 123529
 *         direccion:
 *           type: string
 *           required: true
 *           example: 'Cordoba-123'
 *         user:
 *           type: string
 *           required: true
 *           example: avsdjn43059g43rn234i-dsf
 */

const entradaSalidaSchema = mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['entrada', 'salida'],
  },
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

const EntradaSalida = mongoose.model('EntradaSalida', entradaSalidaSchema);

module.exports = EntradaSalida;
