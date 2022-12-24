const express = require('express');
const {
  crearTarea,
  eliminarTarea,
  modificarTarea,
} = require('../controllers/tareasController');

const router = express.Router();
/**
 * @openapi
 * /tarea/{myId}:
 *   post:
 *     summary: peticion para crear una tarea
 *     tags:
 *       - Tarea
 *     parameters:
 *       - name: myId
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: id del que brinda la tarea
 *     requestBody:
 *       description: datos requeridos para crear la tarea
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TareasBody'
 *     responses:
 *       201:
 *         description: Entrada o Salida creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: La tarea se creo con exito
 *                 tarea:
 *                   $ref: "#/components/schemas/Tareas"
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
 *       404:
 *         description: Usuario admin no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  response:
 *                     type: string
 *                     example: usuario admin no encontrado
 *                  succes:
 *                     type: boolean
 *                     example: false
 */
router.post('/:myId', crearTarea);
/**
 * @openapi
 * /tarea/{taskId}:
 *   delete:
 *     summary: peticion para eliminar una tarea
 *     tags:
 *       - Tarea
 *     parameters:
 *       - name: taskId
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: id de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Tarea eliminada
 *                 tarea:
 *                   $ref: "#/components/schemas/Tarea"
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
 *       404:
 *         description: tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  response:
 *                     type: string
 *                     example: Tarea no encontrada
 *                  succes:
 *                     type: boolean
 *                     example: false
 */
router.delete('/:taskId', eliminarTarea);
/**
 * @openapi
 * /tarea/update/{taskId}:
 *   patch:
 *     summary: peticion para editar una tarea
 *     tags:
 *       - Tarea
 *     parameters:
 *       - name: taskId
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: id de la tarea a editar
 *     requestBody:
 *       description: datos opcionales para editar una tarea
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TareasBody'
 *     responses:
 *       200:
 *         description: Usuario editado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Usuario editado
 *                 data:
 *                   $ref: "#/components/schemas/User"
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
 *       404:
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
router.patch('/update/:taskId', modificarTarea);

module.exports = router;
