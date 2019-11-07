var mongoose = require('mongoose');


var RequestPickupSchema = new mongoose.Schema({
  noOfBags: Number,
  userId: Object,
  fkUserId: {type: mongoose.Schema.ObjectId, required: true},
  fkPickupPinId: {type: mongoose.Schema.ObjectId, required: false},
  userPhoneNumber: String,
  pickupTimeSlot: String,
  status: {type: String, default: 'PENDING'},
  totalValue: {type: Number, default: 0},
  paymentType: String,
  startTime: {type: Date, default: null},
  endTime: {type: Date, default: null},
  accountId: String,
  pinCode:  {type: Number, default: -1},
  requestUserName: {type: String, default: null},
  requestSociety: {type: String, default: null},
  requestFlatNumber: {type: String, default: null},
  requestEmail: {type: String, default: null},
});


module.exports = mongoose.model('RequestPickupModel', RequestPickupSchema);

