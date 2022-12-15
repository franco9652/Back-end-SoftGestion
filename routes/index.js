const express = require('express');
const userRouter = require('./user');
const tareaRouter = require('./tareas');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'SoftGestion API' });
});

router.use('/user', userRouter);
router.use('/tarea', tareaRouter);

module.exports = router;
