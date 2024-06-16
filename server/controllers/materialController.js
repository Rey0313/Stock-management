const mongoose = require('mongoose');
const Material = require('../models/Material');
const Request = require('../models/Request');

exports.getAssignedMaterials = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const materials = await Material.aggregate([
            {
                $match: {
                    "assignments.user": userId,
                    isStored: false
                }
            },
            {
                $unwind: "$assignments"
            },
            {
                $match: {
                    "assignments.user": userId
                }
            },
            {
                $lookup: {
                    from: "rooms",
                    localField: "room",
                    foreignField: "_id",
                    as: "roomDetails"
                }
            },
            {
                $unwind: {
                    path: "$roomDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    type: "$type",
                    name: "$name",
                    room: "$roomDetails.name",
                    assignment_date: "$assignments.grant_date",
                    planned_return_date: "$assignments.planned_return_date",
                    effective_return_date: "$assignments.effective_return_date"
                }
            },
            {
                $group: {
                    _id: "$type",
                    materials: {
                        $push: {
                            _id: "$_id",
                            name: "$name",
                            room: "$room",
                            assignment_date: "$assignment_date",
                            planned_return_date: "$planned_return_date",
                            effective_return_date: "$effective_return_date"
                        }
                    }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);

        res.json(materials);
    } catch (err) {
        console.error('Erreur lors de la récupération des matériels attribués :', err);
        res.status(500).send('Erreur lors de la récupération des matériels attribués : ' + err);
    }
};

exports.askReturn = async (req, res) => {
    try {
        const newReturnRequest = new Request({
            ...req.body,
        });
        await newReturnRequest.save();
        res.status(201).json(newReturnRequest);
    } catch (err) {
        console.error('Erreur lors de la demande de retour :', err);
        res.status(500).send('Erreur lors de la demande de retour : ' + err);
    }
        
};

exports.getMaterialsByType = async (req, res) => {
    try {
        const materials = await Material.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);
        const labels = materials.map(m => m._id);
        const values = materials.map(m => m.count);
        res.json({ labels, values });
    } catch (err) {
        console.error('Erreur lors de la récupération des matériels par type :', err);
        res.status(500).send('Erreur lors de la récupération des matériels par type : ' + err);
    }
};


exports.getUsedMaterials = async (req, res) => {
    try {
        const usedMaterials = await Material.find({ isStored: false }).populate('room').populate('assignments.user');
        res.status(200).json(usedMaterials);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des matériels utilisés", error });
    }
};