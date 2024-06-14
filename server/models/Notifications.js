var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationsSchema = new Schema({
    material_id: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
    read: { type: Boolean, default: false }
});

notificationsSchema.index({ material_id: 1, date: 1 }, { unique: true });

var Notifications = mongoose.model('Notifications', notificationsSchema);
module.exports = Notifications;
