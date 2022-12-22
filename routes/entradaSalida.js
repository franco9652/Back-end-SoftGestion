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
 *     summary: peticion para crear un ingreso o egreso
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
/**
 * @openapi
 * /marcarHorario/{userId}/{entradaSalidaId}:
 *   delete:
 *     summary: peticion para eliminar un ingreso o egreso
 *     tags:
 *       - EntradaSalida
 *     parameters:
 *       - name: userId
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: id del empleado a eliminarle la entrada/salida
 *       - name: entradaSalidaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: id de la entrada/salida a eliminar
 *     responses:
 *       200:
 *         description: Entrada o Salida eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: entrada/salida eliminada de manera exitosa
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
router.delete('/:userId/:entradaSalidaId', eliminarEntradaSalida);

module.exports = router;
