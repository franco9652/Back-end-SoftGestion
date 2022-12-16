const express = require('express');
const userRouter = require('./user');
const tareaRouter = require('./tareas');
const empresaRouter = require('./empresa');
const entradaRouter = require('./entrada');
const infoSalidaRouter = require('./infoSalida');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'SoftGestion API' });
});

router.use('/user', userRouter);
router.use('/tarea', tareaRouter);
router.use('/empresa', empresaRouter);
router.use('/entrada', entradaRouter);
router.use('/infoSalida', infoSalidaRouter);

module.exports = router;
