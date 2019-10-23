var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var RequestPickupModel = require('../models/RequestPickup');
var PickupPinModel = require('../models/PickupPin');
var appConfig = require('../server-config/app-config');

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  UserModel.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:phoneNo', function(req, res, next) {
  UserModel.find({phoneNumber: req.params.phoneNo, enabled: true},
    function(err, record) {
      if(err) return next(err);
      res.json(record);
    }).sort({_id:1}).limit(1);
});

/* SAVE USER */
router.post('/', function(req, res, next) {
  UserModel.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE USER */
router.put('/update-profile/:userId', function(req, res, next) {

  UserModel.findByIdAndUpdate(req.params.userId, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  UserModel.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET PENDING REQUESTS */
router.get('/pending-requests/:userId', function(req, res, next) {
  RequestPickupModel.find({userId: req.params.userId, status: 'PENDING'},
    function(err, record) {
      if(err) return next(err);
      res.json(record);
    }).sort({_id:1});
});

/* STORE REQ PICKUP FOR USER */
router.post('/request-pickup', function (req, res, next) {
  var rewardsEarned = req.body.rewardsEarned;
  var user = {
    name: req.body.name,
    society: req.body.society,
    flatNumber: req.body.flatNumber,
    email: req.body.email,
    creditTo: req.body.creditTo,
    accountId: req.body.accountId
  };
  var reqPickup = {
    noOfBags: req.body.noOfBags,
    userId: req.body.userId.toString(),
    pickupTimeSlot: req.body.pickupTimeSlot,
    totalValue: (req.body.noOfBags * appConfig.rewardsPerBag),
    paymentType: req.body.creditTo,
    accountId: req.body.accountId
  }
  UserModel.findByIdAndUpdate(req.body.userId, user, function (err, updatedUser) {
    if (err) return next(err);
    else {
      RequestPickupModel.create(reqPickup, function (err, post) {
        if (err) return next(err);
        else {
          var responseObj = {
            rewardsEarned: rewardsEarned,
            reqId: post._id
          };
          generateReqPIN(post._id.toString());
        }
        res.json(responseObj);
      });
    }
  });
})

/* COMPLETE REQUEST PICKUP AND GET DEPOSIT */
router.post('/request-pickup/complete', function (req, res, next) {
  var newRewards = 0;
  console.log("here@#@#@#@#@#: "+JSON.stringify(req.body))
  UserModel.findById(req.body._id,
    function(err, user) {
      if(err) return next(err);
      else {
        var oldRewards = user.rewardsEarned;
        PickupPinModel.findOne({"requestId": req.body.requestId, randomPIN: req.body.pinCode, enabled: true},
          function (err, pinObject) {
            if(pinObject != null) {
              RequestPickupModel.findById(req.body.requestId,
                function (err, requestPickup) {
                  requestPickup.noOfBags = req.body.noOfBags;
                  requestPickup.totalValue = calculateTotalValue(req.body.noOfBags);
                  var requestRewards = requestPickup.totalValue;
                  newRewards = oldRewards + requestRewards;

                  user.rewardsEarned = newRewards;

                  pinObject.enabled = false;

                  requestPickup.pinCode = pinObject.randomPIN;
                  requestPickup.status = "COMPLETED";

                  user.save(); //update the user's rewards
                  requestPickup.save(); //update status
                  pinObject.save();
                  res.json(newRewards);
                });
            } else {
              res.json({
                "error":"Agent PIN Code is invalid"
              });
            }
          });
      }
    }).sort({_id:1}).limit(1);
})

/* CANCEL REQUEST PICKUP */
router.post('/request-pickup/cancel', function (req, res, next) {
  RequestPickupModel.findById(req.body._id,
    function (err, requestPickup) {
      requestPickup.status = "CANCELLED";
      requestPickup.save(); //update status
      res.json(requestPickup)
    });
})


function generateReqPIN(requestPickupId) {
  var randomPIN = getRandom4Digit();
  PickupPinModel.create({
    requestId: requestPickupId,
    randomPIN: randomPIN,
    enabled: true
  }, function (err, post) {
    if (err) return next(err);
  });
};

function getRandom4Digit() {
  return Math.floor(1000 + Math.random() * 9000);
}

function calculateTotalValue(noOfBags) {
  return noOfBags * (appConfig.rewardsPerBag);
}

module.exports = router;
