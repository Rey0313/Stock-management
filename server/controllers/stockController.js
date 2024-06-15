var Stock = require('../models/Stock');

exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Stock.find({ isStored: true }).sort({ type: 1 });
        res.json(materials);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des matériaux : ' + err);
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
        res.status(500).send("Erreur lors de l'ajout d'un matériel : " + err);
    }
};

exports.deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params; 
        await Stock.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Erreur lors de la suppression du matériel : ' + err);
    }
};
