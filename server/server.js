var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');
const requestRoutes = require('./routes/requestRoutes');
const cors = require('cors');
var app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/materials', stockRoutes);
app.use('/api/requests', requestRoutes);

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
