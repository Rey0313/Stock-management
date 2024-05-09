var express = require('express');
var router = express.Router();
var requestController = require('../controllers/requestController');


router.get('/', requestController.getAllRequests);
router.post('/', requestController.createRequest);


module.exports = router;