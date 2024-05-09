var Request = require('../models/Request');

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id", 
                    as: "userData" 
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
                    _id: 0,
                    status: 1,
                    request_date: 1, 
                    "userFirstname": "$userData.firstname",
                    "userLastname": "$userData.lastname",
                    "materialType": "$materialData.type",
                    "materialName": "$materialData.name"
                }
            }
        ]);
        res.json(requests);
    } catch (err) {
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
        res.status(500).send("Erreur lors de la création de la demande : " + err);
    }
};
