var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    material: { type: Schema.Types.ObjectId, ref: 'Material' },
    type: {type: String, required: true},
    status: { type: String, required: true },
    request_date: { type: Date, default: Date.now },
    room: { type: Schema.Types.ObjectId, ref: 'Room' }
});

var requestModel = mongoose.model('Request', requestSchema);
module.exports = requestModel;