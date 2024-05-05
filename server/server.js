var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    lastname: { type: String, default: null },
    firstname: { type: String, default: null },
    organisation_name: { type: String, default: null },
    mail: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'organisme', 'membre'], default: 'membre' },
    creation_date: { type: Date, default: Date.now }
});


const assignmentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    grant_date: Date,
    planned_return_date: Date,
    effective_return_date: { type: Date, default: null }
}, { _id: false });


const materialSchema = new Schema({
    type: { type: String, required: true },
    renewal_date: Date,
    isStored: { type: Boolean, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    assignments: [assignmentSchema]
});



var userModel = mongoose.model('User', userSchema);
var materialModel = mongoose.model('Material', materialSchema);

var userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
var app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/materials', async (req, res) => {
    try {
        const materials = await materialModel.find({ isStored: true }).sort({ type: 1 });
        res.json(materials);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs : ' + err);
    }
});


async function startServer() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/projet');
        console.log('Connexion à la base de données réussie');
        app.listen(3000, () => {
            console.log('Serveur démarré sur le port 3000');
        });
    } catch (err) {
        console.log('Erreur de connexion à la base de données : ' + err);
    }
}

startServer();
