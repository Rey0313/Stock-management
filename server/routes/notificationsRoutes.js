var express = require('express');
var router = express.Router();
var notificationsController = require('../controllers/notificationsController');
const auth = require('../middleware/auth');

router.use(auth.verifyToken);

router.get('/', notificationsController.getAllNotifications);
router.post('/', notificationsController.createNotification);
router.post('/check', notificationsController.checkRenewalDates);
router.post('/:id/read', notificationsController.markAsRead);
    router.delete('/:id', notificationsController.deleteNotification);

module.exports = router;
