var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.use(auth.verifyToken);

router.get('/', auth.checkRole(['admin']), userController.getAllUsers);
router.post('/', auth.checkRole(['admin']), userController.createUser);
router.delete('/:id', auth.checkRole(['admin']), userController.deleteUser);
router.put('/:id', auth.checkUserOrAdmin, userController.updateUser);
router.get('/:id', auth.checkUserOrAdmin, userController.getUserById);

module.exports = router;