const express = require('express');
const {
  crearInfoSalida,
  eliminarInfoSalida,
} = require('../controllers/infoSalidaController');

const router = express.Router();

router.post('/:userId', crearInfoSalida);
router.delete('/:userId/:salidaId', eliminarInfoSalida);

module.exports = router;
