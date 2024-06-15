var express = require('express');
var router = express.Router();
var roomController = require('../controllers/roomController');


router.get('/', roomController.getAllRooms);


module.exports = router;