/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
 *         salary:
 *           type: number
 *           example: 12345
 *         password:
 *           type: string
 *           example: miPassword
 *         oldPassword:
 *           type: array
 *           example: historicoPassword
 *         entradaSalida:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/EntradaSalida"
 *         asignacionTareas:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Tareas"
 */

const UserSchema = mongoose.Schema(
  {
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
    salary: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    oldPasswords: {
      type: [{ type: String }],
      required: false,
      default: [],
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
  },
  {
    timestamps: true,
    methods: {
      verifyPass(password) {
        const isMatch = bcrypt.compareSync(password, this.password);
        return isMatch;
      },
      checkOldPass(password) {
        if (this.oldPasswords.length === 0) {
          return false;
        }
        return this.oldPasswords.some((element) =>
          bcrypt.compareSync(password, element)
        );
      },
    },
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
