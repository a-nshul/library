const express = require('express');
const {
  createAdmin,
  adminLogin,
  getAdmins,
  updateAdmin,
  deleteAdmin
} = require('../controllers/adminController');
const router = express.Router();

router.post('/', createAdmin);
router.post('/login', adminLogin);
router.get('/', getAdmins);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

module.exports = router;
