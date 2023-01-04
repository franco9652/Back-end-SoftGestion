const express = require('express');
const {
  createRecibo,
  getRecibo,
  deleteRecibo,
} = require('../controllers/reciboController');

const router = express.Router();

router.post('/:userId', createRecibo);
router.get('/:reciboId', getRecibo);
router.delete('/:reciboId', deleteRecibo);

module.exports = router;
