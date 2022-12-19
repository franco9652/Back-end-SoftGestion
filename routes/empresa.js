const express = require('express');
const {
  crearEmpresa,
  obtenerEmpresa,
  obtenerEmpresasLogisticas,
  obtenerEmpresasConstructoras,
  eliminarEmpresa,
} = require('../controllers/empresaController');

const router = express.Router();

router.post('/myId:userId', crearEmpresa);
router.get('/:userId', obtenerEmpresa);
router.get('/:userId', obtenerEmpresasLogisticas);
router.get('/:userId', obtenerEmpresasConstructoras);
router.delete('/myId:userId', eliminarEmpresa);

module.exports = router;
