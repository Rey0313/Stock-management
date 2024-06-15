var express = require('express');
var router = express.Router();
var stockController = require('../controllers/stockController');
const auth = require('../middleware/auth');

router.use(auth.verifyToken);

router.get('/', stockController.getAllMaterials);
router.post('/', stockController.addMaterial);
router.delete('/:id', auth.checkRole(['admin']), stockController.deleteMaterial);

module.exports = router;
