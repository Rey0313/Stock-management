var express = require('express');
var router = express.Router();
var stockController = require('../controllers/stockController');


router.get('/', stockController.getAllMaterials);
router.post('/', stockController.addMaterial);
router.delete('/:id', stockController.deleteMaterial);


module.exports = router;