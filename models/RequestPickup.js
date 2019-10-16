var mongoose = require('mongoose');


var RequestPickupSchema = new mongoose.Schema({
  noOfBags: Number,
  userId: Object,
  userPhoneNumber: String,
  pickupTimeSlot: String
});


module.exports = mongoose.model('RequestPickupModel', RequestPickupSchema);

