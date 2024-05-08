var express = require('express');
var router = express.Router();
var stockController = require('../controllers/stockController');


router.get('/', stockController.getAllMaterials);


module.exports = router;