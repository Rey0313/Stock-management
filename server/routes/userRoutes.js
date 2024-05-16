var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.use(auth.verifyToken);

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);

module.exports = router;