const express = require('express');
const {
  createRecibo,
  getRecibo,
  getRecibos,
  deleteRecibo,
} = require('../controllers/reciboController');

const router = express.Router();

router.post('/upload/:userId', createRecibo);
router.get('/getOne/:reciboId', getRecibo);
router.get('/lista', getRecibos);
router.delete('/:reciboId', deleteRecibo);

module.exports = router;
