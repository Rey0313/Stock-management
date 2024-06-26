var express = require('express');
var router = express.Router();
var materialController = require('../controllers/materialController');

router.get('/assigned/:id', materialController.getAssignedMaterials);
router.post('/return', materialController.askReturn);
router.get('/byType', materialController.getMaterialsByType);
router.get('/used', materialController.getUsedMaterials);

module.exports = router;
