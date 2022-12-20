const express = require('express');
const {
  crearEmpresa,
  obtenerUnaEmpresa,
  obtenerEmpresas,
  eliminarEmpresa,
  modificarEmpresa,
} = require('../controllers/empresaController');

const router = express.Router();

router.post('/:myId/:userId', crearEmpresa);
router.get('/:empresaId', obtenerUnaEmpresa);
router.get('/', obtenerEmpresas);
router.put('/:myId/:empresaId', modificarEmpresa);
router.delete('/:myId/:empresaId', eliminarEmpresa);

module.exports = router;
