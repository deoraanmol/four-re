var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  phoneNumber: String,
  name: String,
  society: String,
  flatNumber: String,
  email: String,
  creditTo: String,
  accountId: String,
  enabled: Boolean,
  rewardsEarned: {type: Number, default: 0}
});


module.exports = mongoose.model('UserModel', UserSchema);

