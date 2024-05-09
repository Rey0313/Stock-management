var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    material: { type: Schema.Types.ObjectId, ref: 'Material' },
    status: { type: String, required: true },
    request_date: { type: Date, default: Date.now },
});

var requestModel = mongoose.model('Request', requestSchema);
module.exports = requestModel;