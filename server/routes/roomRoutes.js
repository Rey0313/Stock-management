var express = require('express');
var router = express.Router();
var roomController = require('../controllers/roomController');


router.get('/', roomController.getAllRooms);
router.post('/', roomController.addRoom);


module.exports = router;