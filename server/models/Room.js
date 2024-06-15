var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: { type: String, required: true },
});

var roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;
