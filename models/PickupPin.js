var mongoose = require('mongoose');


var PickupPinSchema = new mongoose.Schema({
  randomPIN: Number,
  enabled: Boolean,
  requestId: String
});


module.exports = mongoose.model('PickupPinModel', PickupPinSchema);

