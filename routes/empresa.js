const express = require('express');
const {
  crearEmpresa,
  obtenerUnaEmpresa,
  obtenerEmpresas,
  eliminarEmpresa,
  modificarEmpresa,
} = require('../controllers/empresaController');

const router = express.Router();
/**
 * @openapi
 * /empresa/create/{ownerId}:
 *   post:
 *     summary: peticion para crear una empresa, se requiere pasar por query el id del owner
 *     tags:
 *       - Empresa
 *     parameters:
 *       - name: myId
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *         description: el id del dueño de la empresa
 *     requestBody:
 *       description: datos requeridos para crear la empresa
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       201:
 *         description: Empresa creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Empresa"
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
 *                     example: la empresa x, ya esta registrada
 *                  succes:
 *                     type: boolean
 *                     example: false
 *       404:
 *         description: error al crearse la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  response:
 *                     type: string
 *                     example: mensaje de error
 *                  succes:
 *                     type: boolean
 *                     example: false
 */
router.post('/create/:ownerId', crearEmpresa);
/**
 * @openapi
 * /empresa/getOne/{empresaId}:
 *   get:
 *     summary: peticion para crear obtener una empresa
 *     tags:
 *       - Empresa
 *     parameters:
 *       - name: empresaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: el id de la empresa
 *     responses:
 *       200:
 *         description: Empresa obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Empresa"
 *                 succes:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Empresa no encontrada
 */
router.get('/getOne/:empresaId', obtenerUnaEmpresa);
/**
 * @openapi
 * /empresa/lista:
 *   get:
 *     summary: peticion para obtener una lista de empresas
 *     tags:
 *       - Empresa
 *     parameters:
 *       - name: tipoDeEmpresa
 *         in: query
 *         schema:
 *           type: string
 *           enum: [logistica, constructora]
 *         description: El tipo de la empresa
 *     responses:
 *       200:
 *         description: Empresa obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Empresa"
 *                 succes:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Empresa no encontrada
 */
router.get('/lista', obtenerEmpresas);
/**
 * @openapi
 * /empresa/modify/{empresaID}:
 *   put:
 *     summary: peticion para modificar una empresa
 *     tags:
 *       - Empresa
 *     parameters:
 *       - name: empresaId
 *         in: path
 *         schema:
 *           type: string
 *         description: El id de la empresa
 *     requestBody:
 *       description: NO USAR LA KEY DE USERS
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       200:
 *         description: Empresa modificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Empresa"
 *                   description: como este ejemplo solo que con los datos modificados y no de ejemplo
 *                 succes:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Empresa no encontrada
 *                 succes:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: X mensaje de error
 *                 succes:
 *                   type: boolean
 *                   example: false
 */
router.put('/modify/:empresaId', modificarEmpresa);
/**
 * @openapi
 * /empresa/delete/{empresaId}:
 *   delete:
 *     summary: peticion para eliminar una empresa
 *     tags:
 *       - Empresa
 *     parameters:
 *       - name: empresaId
 *         in: path
 *         schema:
 *           type: string
 *         description: El id de la empresa
 *     responses:
 *       200:
 *         description: Empresa eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Empresa"
 *                   description: Datos de la empresa eliminada
 *                 succes:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: Empresa no encontrada
 *                 succes:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: X mensaje de error
 *                 succes:
 *                   type: boolean
 *                   example: false
 */
router.delete('/delete/:empresaId', eliminarEmpresa);

module.exports = router;
