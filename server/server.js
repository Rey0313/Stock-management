var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    lastname: String,
    firstname: String,
    organisation_name: String,
    mail: String,
    password: String,
    role: String,
    created_at: { type: Date, default: Date.now }
});

var userModel = mongoose.model('User', userSchema);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs : ' + err);
    }
});

async function startServer() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/projet');
        console.log('Connexion à la base de données réussie');
        app.listen(3000, function () {
            console.log('Serveur démarré sur le port 3000');
        });
    } catch (err) {
        console.log('Erreur de connexion à la base de données : ' + err);
    }
}

startServer();