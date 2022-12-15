const express = require('express');
const {
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router;
