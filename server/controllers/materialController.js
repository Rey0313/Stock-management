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
