var User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs : ' + err);
    }
};

exports.createUser = async (req, res) => {
    try {
        const userInstance = new User(req.body);
        const hashedPassword = await userInstance.encryptPassword(req.body.password);
        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send("L'adresse mail est déjà utilisée!");
        } else {
            res.status(500).send('Erreur lors de la création de l’utilisateur : ' + err);
        }
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Utilisateur supprimé' });
        } else {
            res.status(404).send('Utilisateur non trouvé');
        }
    } catch (err) {
        res.status(500).send('Erreur lors de la suppression de l’utilisateur : ' + err);
    }
};

exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).send("Utilisateur non trouvé");
      }
  
      const newToken = auth.generateToken(updatedUser);
      res.status(200).json({ user: updatedUser, token: newToken });
    } catch (err) {
      res.status(500).send('Erreur lors de la mise à jour de l’utilisateur : ' + err.message);
    }
  };
  
  exports.updateUserPassword = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe', error: err.message });
    }
  };

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("Utilisateur non trouvé");
        }
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération de l’utilisateur : ' + err);
    }
};
