const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.mail, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

exports.verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if (!token) {
    return res.status(403).send('Un token est nécessaire pour l’authentification');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Token invalide');
  }
  return next();
};

exports.checkRole = (roles) => (req, res, next) => {
  const userRole = req.user.role;
  if (!roles.includes(userRole)) {
    return res.status(403).send("Accès refusé");
  }
  next();
};

exports.checkUserOrAdmin = (req, res, next) => {
  const userRole = req.user.role;
  const userId = req.user._id;
  const paramId = req.params.id;

  if (userRole === 'admin' || userId === paramId) {
    next();
  } else {
    res.status(403).send("Accès refusé");
  }
};