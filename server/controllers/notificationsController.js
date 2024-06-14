var Notifications = require('../models/Notifications');
var Material = require('../models/Material');

exports.createNotification = async (req, res) => {
    try {
        const notification = new Notifications(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).send('Erreur lors de la création de la notification : ' + err);
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notifications.find({});
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des notifications : ' + err });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notifications.findByIdAndUpdate(notificationId, { read: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ error: 'Notification non trouvée' });
        }
        res.status(200).json({ message: 'Notification marquée comme lue', notification });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la notification : ' + err });
    }
};

exports.checkRenewalDates = async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const materials = await Material.find({ renewal_date: { $lte: today } });

        const notificationsToCreate = [];
        
        for (let material of materials) {
            const existingNotification = await Notifications.findOne({
                material_id: material._id,
                date: today
            });

            if (!existingNotification) {
                notificationsToCreate.push({
                    material_id: material._id,
                    message: `Le matériel ${material.name} (type : ${material.type}) doit être renouvelé aujourd'hui.`,
                    date: today
                });
            }
        }

        if (notificationsToCreate.length > 0) {
            await Notifications.insertMany(notificationsToCreate);
        }

        res.status(200).json({ message: 'Notifications vérifiées et créées.' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la vérification des dates de renouvellement : ' + err });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await Notifications.findByIdAndDelete(notificationId);
        if (!notification) {
            return res.status(404).json({ error: 'Notification non trouvée' });
        }
        res.status(200).json({ message: 'Notification supprimée' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la notification : ' + err });
    }
};