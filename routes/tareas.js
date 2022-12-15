const express = require('express');
const {
  crearTarea,
  eliminarTarea,
  modificarTarea,
} = require('../controllers/tareasController');

const router = express.Router();

router.post('/:myId/:userId', crearTarea);
router.post('/:taskId', eliminarTarea);
router.patch('/update/:taskId', modificarTarea);

module.exports = router;
