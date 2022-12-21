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
 * /empresa:
 *   get:
 *     tags:
 *       - Empresa
 *     parameters:
 *       - name: myId
 *         in: path
 *         schema:
 *           type: string
 *         description: el id del dueño de la empresa
 *     responses:
 *       200:
 *         description: OK
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
 */
router.post('/:myId', crearEmpresa);
router.get('/:empresaId', obtenerUnaEmpresa);
router.get('/', obtenerEmpresas);
router.put('/:myId/:empresaId', modificarEmpresa);
router.delete('/:myId/:empresaId', eliminarEmpresa);

module.exports = router;
