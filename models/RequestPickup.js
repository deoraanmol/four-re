var mongoose = require('mongoose');


var RequestPickupSchema = new mongoose.Schema({
  noOfBags: Number,
  userId: Object,
  userPhoneNumber: String,
  pickupTimeSlot: String,
  status: {type: String, default: 'PENDING'},
  totalValue: {type: Number, default: 0},
  paymentType: String,
  accountId: String
});


module.exports = mongoose.model('RequestPickupModel', RequestPickupSchema);

