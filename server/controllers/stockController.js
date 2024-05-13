var Stock = require('../models/Stock');

exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Stock.find({ isStored: true }).sort({ type: 1 });
        res.json(materials);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération du materiel : ' + err);
    }
};

exports.addMaterial = async (req, res) => {
    try {
        const newMaterial = new Stock({
            ...req.body,
        });
        await newMaterial.save();
        res.status(201).json(newMaterial);
    } catch (err) {
        res.status(500).send("Erreur lors de l'ajout du materiel : " + err);
    }
};

exports.deleteMaterial = async (req, res) => {
    try {
        const result = await Stock.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Materiel supprimé' });
        } else {
            res.status(404).send('Materiel non trouvé');
        }
    } catch (err) {
        res.status(500).send('Erreur lors de la suppression du materiel : ' + err);
    }
};

