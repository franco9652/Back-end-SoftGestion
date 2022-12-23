const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     TareasBody:
 *       type: object
 *       properties:
 *         fechaHora:
 *           type: string
 *           format: date-time
 *         obra:
 *           type: string
 *           example: x obra
 *         tarea:
 *           type: string
 *           example: ordenar las fichas por fecha
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Tareas:
 *       type: object
 *       properties:
 *         fechaHora:
 *           type: string
 *           format: date-time
 *         nombre:
 *           type: string
 *           example: asdfagsasdf1
 *           description: Id del que dio la tarea
 *         obra:
 *           type: string
 *           example: x obra
 *         tarea:
 *           type: string
 *           example: ordenar las fichas por fecha
 *         userId:
 *           type: string
 *           example: a1234123csadf23r
 *           description: id del empleado al que se le asigna la tarea
 *         isSucces:
 *           type: boolen
 *           default: false
 */

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
  userId: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'User',
  },
  isSucces: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Tarea = mongoose.model('Tarea', TareasSchema);
module.exports = Tarea;
