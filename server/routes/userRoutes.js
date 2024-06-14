var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/', userController.createUser);

router.use(auth.verifyToken);

router.get('/', auth.checkRole(['admin']), userController.getAllUsers);
router.delete('/:id', auth.checkRole(['admin']), userController.deleteUser);
router.put('/:id', auth.checkUserOrAdmin, userController.updateUser);
router.get('/:id', auth.checkUserOrAdmin, userController.getUserById);
router.put('/:id/password', auth.checkUserOrAdmin, userController.updateUserPassword);


module.exports = router;