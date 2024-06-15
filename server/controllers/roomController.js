var Room = require('../models/Room');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ name: 1 });
        res.json(rooms);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des salles : ' + err);
    }
};