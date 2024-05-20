const mongoose = require('mongoose');
const Request = require('../models/Request');
const Material = require('../models/Material');
const STOCKAGE_ROOM_ID = '66300e0f96ccd56844571515';

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userData",
                }
            },
            {
                $lookup: {
                    from: "materials",
                    localField: "material",
                    foreignField: "_id",
                    as: "materialData"
                }
            },
            {
                $unwind: "$userData"
            },
            {
                $unwind: "$materialData"
            },
            {
                $project: {
                    _id: "$_id",
                    status: 1,
                    request_date: 1,
                    type: 1,
                    "userFirstname": "$userData.firstname",
                    "userLastname": "$userData.lastname",
                    "materialType": "$materialData.type",
                    "materialName": "$materialData.name"
                }
            },
        ]);
        res.json(requests);
    } catch (err) {
        console.error('Erreur lors de la récupération des demandes :', err);
        res.status(500).send('Erreur lors de la récupération des demandes : ' + err);
    }
};

exports.getMyRequests = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);

        const requests = await Request.aggregate([
            {
                $match: {
                    user: userId
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userData",
                }
            },
            {
                $lookup: {
                    from: "materials",
                    localField: "material",
                    foreignField: "_id",
                    as: "materialData"
                }
            },
            {
                $unwind: {
                    path: "$userData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$materialData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: "$_id",
                    status: 1,
                    request_date: 1,
                    type: 1,
                    "userFirstname": "$userData.firstname",
                    "userLastname": "$userData.lastname",
                    "materialType": "$materialData.type",
                    "materialName": "$materialData.name"
                }
            }
        ]);
        res.json(requests);
    } catch (err) {
        console.error('Erreur lors de la récupération des demandes :', err);
        res.status(500).send('Erreur lors de la récupération des demandes : ' + err);
    }
};

exports.createRequest = async (req, res) => {
    try {
        const newRequest = new Request({
            ...req.body,
        });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        console.error('Erreur lors de la création de la demande :', err);
        res.status(500).send("Erreur lors de la création de la demande : " + err);
    }
};

exports.acceptAssign = async (req, res) => {
    try {
        const { requestId } = req.body;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).send('Demande non trouvée');
        }

        const material = await Material.findById(request.material);
        if (!material) {
            return res.status(404).send('Matériel non trouvé');
        }

        if (!material.assignments) {
            material.assignments = [];
        }

        material.isStored = false;
        
        material.assignments.push({
            user: request.user,
            grant_date: new Date(),
            planned_return_date: request.planned_return_date || null
        });

        await material.save();

        request.status = 'acceptee';
        await request.save();

        res.status(200).json(request);
    } catch (err) {
        console.error('Erreur lors de l\'acceptation de la demande :', err);
        res.status(500).send('Erreur lors de l\'acceptation de la demande : ' + err);
    }
};

exports.rejectAssign = async (req, res) => {
    try {
        const { requestId } = req.body;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).send('Demande non trouvée');
        }

        request.status = 'refusee';
        await request.save();

        res.status(200).json(request);
    } catch (err) {
        console.error('Erreur lors du refus de la demande :', err);
        res.status(500).send('Erreur lors du refus de la demande : ' + err);
    }
};

exports.acceptReturn = async (req, res) => {
    try {
        const { requestId } = req.body;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).send('Demande non trouvée');
        }

        const material = await Material.findById(request.material);
        if (!material) {
            return res.status(404).send('Matériel non trouvé');
        }

        if (material.assignments) {
            material.assignments = null;
        }

        material.isStored = true;
        material.room = STOCKAGE_ROOM_ID;

        await material.save();

        request.status = 'acceptee';
        await request.save();

        res.status(200).json(request);
    } catch (err) {
        console.error('Erreur lors de l\'acceptation de la demande :', err);
        res.status(500).send('Erreur lors de l\'acceptation de la demande : ' + err);
    }
};

exports.rejectReturn = async (req, res) => {
    try {
        const { requestId } = req.body;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).send('Demande non trouvée');
        }

        request.status = 'refusee';
        await request.save();

        res.status(200).json(request);
    } catch (err) {
        console.error('Erreur lors du refus de la demande :', err);
        res.status(500).send('Erreur lors du refus de la demande : ' + err);
    }
};
