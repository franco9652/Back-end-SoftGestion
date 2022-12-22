const express = require('express');
const {
  marcarIngresoEgreso,
  eliminarEntradaSalida,
} = require('../controllers/entradaSalidaController');

const router = express.Router();
/**
 * @openapi
 * /marcarHorario/{userId}:
 *   post:
 *     summary: peticion para crear una empresa, se requiere pasar por query el id del owner
 *     tags:
 *       - EntradaSalida
 *     parameters:
 *       - name: userId
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: id del empleado que marcara horario
 *     requestBody:
 *       description: datos requeridos para marcar el horario, ELIMINAR LA KEY USUARIO
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EntradaSalida'
 *     responses:
 *       201:
 *         description: Entrada o Salida creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/EntradaSalida"
 *                 succes:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  response:
 *                     type: string
 *                     example: X mesaje de error
 *                  succes:
 *                     type: boolean
 *                     example: false
 */
router.post('/:userId', marcarIngresoEgreso);
router.delete('/:userId/:entradaId', eliminarEntradaSalida);

module.exports = router;
