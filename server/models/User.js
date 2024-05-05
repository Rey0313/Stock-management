var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    lastname: { type: String, default: null },
    firstname: { type: String, default: null },
    organisation_name: { type: String, default: null },
    mail: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'organisme', 'membre'], default: 'membre' },
    creation_date: { type: Date, default: Date.now }
});

userSchema.methods.encryptPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

var userModel = mongoose.model('User', userSchema);
module.exports = userModel;