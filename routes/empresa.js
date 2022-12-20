const express = require('express');
const {
  crearEmpresa,
  obtenerEmpresa,
  obtenerEmpresasLogisticas,
  obtenerEmpresasConstructoras,
  eliminarEmpresa,
  modificarEmpresa,
} = require('../controllers/empresaController');

const router = express.Router();

router.post('/:myId/:userId', crearEmpresa);

// * tuyas Herni
router.get('/:userId', obtenerEmpresa);
router.get('/:userId', obtenerEmpresasLogisticas);
router.get('/:userId', obtenerEmpresasConstructoras);

router.put('/:myId/:empresaId', modificarEmpresa);
router.delete('/:myId/:empresaId', eliminarEmpresa);

module.exports = router;
