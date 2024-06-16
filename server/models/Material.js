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
    assignments: [assignmentSchema],
    access: {
        membre: { type: Boolean, required: true },
        organisme: { type: Boolean, required: true },
        admin: { type: Boolean, default: true, required: true }
    }
});

var materialModel = mongoose.model('Material', materialSchema);
module.exports = materialModel;
