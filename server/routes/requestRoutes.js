var express = require('express');
var router = express.Router();
var requestController = require('../controllers/requestController');


router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getMyRequests);
router.post('/', requestController.createRequest);

router.post('/acceptAssign', requestController.acceptAssign);
router.post('/rejectAssign', requestController.rejectAssign);

router.post('/acceptReturn', requestController.acceptReturn);
router.post('/rejectReturn', requestController.rejectReturn);


module.exports = router;