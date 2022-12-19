const express = require('express');
const {
  crearEntrada,
  eliminarEntrada,
} = require('../controllers/entradaController');

const router = express.Router();

router.post('/:userId', crearEntrada);
router.delete('/:userId/:entradaId', eliminarEntrada);

module.exports = router;
