const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.body.mail });
    if (!user) {
      return res.status(401).send('Authentification échouée.');
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send('Authentification échouée.');
    }
    const token = generateToken(user);
    res.status(200).json({ message: "Connexion réussie", token: token });
  } catch (error) {
    res.status(500).send('Erreur serveur.');
  }
});

module.exports = router;
