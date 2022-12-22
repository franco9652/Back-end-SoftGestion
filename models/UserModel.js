const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Jose
 *         lastName:
 *           type: string
 *           example: Herrera
 *         image:
 *           type: string
 *           example: foto.jpg
 *         dni:
 *           type: string
 *           example: 12.345.678
 *         role:
 *           type: boolean
 *           example: false
 *           default: false
 *         entradaSalida:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/EntradaSalida"
 *         asignacionTareas:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Tareas"
 */

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
    type: Boolean,
    required: true,
    default: false,
    trim: true,
  },
  entradaSalida: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Entrada',
    },
  ],
  asignacionTareas: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Tarea',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
