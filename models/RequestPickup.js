var mongoose = require('mongoose');


var RequestPickupSchema = new mongoose.Schema({
  noOfBags: Number,
  userId: Object,
  fkUserId: {type: mongoose.Schema.ObjectId, required: true},
  fkPickupPinId: {type: mongoose.Schema.ObjectId, required: false},
  userPhoneNumber: String,
  status: {type: String, default: 'PENDING'},
  totalValue: {type: Number, default: 0},
  paymentType: String,
  accountId: String,
  pinCode:  {type: Number, default: -1},
  requestUserName: {type: String, default: null},
  requestSociety: {type: String, default: null},
  bagSize: String,
  requestCreated: String,
  requestUpdated: Date,
});


module.exports = mongoose.model('RequestPickupModel', RequestPickupSchema);

