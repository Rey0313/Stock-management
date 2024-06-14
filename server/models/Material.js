var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    grant_date: Date,
    planned_return_date: Date,
    effective_return_date: { type: Date, default: null }
}, { _id: false });

var materialSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    renewal_date: { type: Date, required: true },
    isStored: { type: Boolean, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    assignments: [assignmentSchema]
});

var materialModel = mongoose.model('Material', materialSchema);
module.exports = materialModel;
