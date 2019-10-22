var mongoose = require('mongoose');


var PickupPinSchema = new mongoose.Schema({
  requestPickupId: String,
  randomPIN: Number,
  enabled: Boolean
});


module.exports = mongoose.model('PickupPinModel', PickupPinSchema);

