const express = require('express');
const {
  createUser,
  deleteUser,
  updateUser,
  getUser,
} = require('../controllers/userController');

const router = express.Router();

/**
 * @openapi
 * /user/:
 *   post:
 *     summary: peticion para crear un usuario
 *     tags:
 *       - User
 *     requestBody:
 *       description: datos requeridos para crear un usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jose
 *               lastName:
 *                 type: string
 *                 example: Herrera
 *               image:
 *                 type: string
 *                 example: foto.jpg
 *               dni:
 *                 type: string
 *                 example: 12.345.678
 *               role:
 *                 type: boolean
 *                 example: false
 *                 default: false
 *               password:
 *                 type: string
 *                 example: miPassword
 *     responses:
 *       201:
 *         description: Usuario Creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
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
 */
router.post('/', createUser);
/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: peticion para eliminar un usuario
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: id del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Usuario eliminado
 *                 usuarioEliminado:
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
 */
router.delete('/:id', deleteUser);
/**
 * @openapi
 * /user/{id}:
 *   patch:
 *     summary: peticion para editar un usuario
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: id del usuario a eliminar
 *     requestBody:
 *       description: datos opcionales para editar un usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jose
 *                 required: false
 *               lastName:
 *                 type: string
 *                 example: Herrera
 *                 required: false
 *               image:
 *                 type: string
 *                 example: foto.jpg
 *                 required: false
 *               dni:
 *                 type: string
 *                 example: 12.345.678
 *                 required: false
 *               role:
 *                 type: boolean
 *                 example: false
 *                 default: false
 *                 required: false
 *               password:
 *                 type: string
 *                 example: miPassword
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
 */
router.patch('/:id', updateUser);
/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: peticion para obtener un usuario
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: id del usuario a obtener
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
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
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  response:
 *                     type: string
 *                     example: Usuario no encontrado
 *                  succes:
 *                     type: boolean
 *                     example: false
 */
router.get('/:id', getUser);

module.exports = router;
