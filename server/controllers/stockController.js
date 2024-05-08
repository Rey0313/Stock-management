var Stock = require('../models/Stock');

exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Stock.find({ isStored: true }).sort({ type: 1 });
        res.json(materials);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs : ' + err);
    }
};
