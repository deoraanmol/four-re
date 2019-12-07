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

/* GET COMPLETED REQUESTS */
router.get('/completed-requests/:userId', function(req, res, next) {
  RequestPickupModel.find({userId: req.params.userId, status: 'COMPLETED'},
    function(err, record) {
      if(err) return next(err);
      res.json(record);
    }).sort({_id:-1});
});

/* GET APP CONFIG */
router.get('/get-app-config/:type', function(req, res, next) {
  try {
    res.json({
      paymentTypes: appConfig.paymentTypes,
      givenTimeSlots: appConfig.givenTimeSlots,
      givenTimeSlotInterval: appConfig.givenTimeSlotInterval,
      societies: appConfig.societies,
      bagSizes: appConfig.bagTypes,
      cannotCancelBefore: appConfig.cancelRequestConstraints.cannotCancelBefore,
      cannotCancelAfter: appConfig.cancelRequestConstraints.cannotCancelAfter,
      canRequestBefore: appConfig.newRequestConstraints.canRequestBefore
    });
  } catch(err) {
    next(err);
  }
});

router.get('/get-app-config-m1/:type', function(req, res, next) {
  try {
    res.json({
    });
  } catch(err) {
    next(err);
  }
});

router.get('/get-app-config-m2/:type', function(req, res, next) {
  try {
    res.json({
      "foo":"bar"
    });
  } catch(err) {
    next(err);
  }
});

router.post('/get-time-slots', function(req, res, next) {

  let nextGreaterIndex = -1;
  let allTimeSlots = [];
  let todayTimeSlots = [];
  let tomorrowTimeSlots = [];
  const currentHours = req.body.currentHrs;
  for(let idx = 0; idx< appConfig.givenTimeSlots.length; idx++) {
    var diffInMins = ( appConfig.givenTimeSlots[idx] * 60 ) - (currentHours * 60);
    if(diffInMins > appConfig.newRequestConstraints.canRequestBefore) {
      nextGreaterIndex = idx;
      break;
    }
  }
  if(nextGreaterIndex > -1) {
    todayTimeSlots = prepareTodaysSlots(nextGreaterIndex);
  }
  tomorrowTimeSlots = prepareTomorrowSlots();
  allTimeSlots = todayTimeSlots.concat(tomorrowTimeSlots);
  allTimeSlots = injectUniqueId(allTimeSlots);
  console.log("herere: "+nextGreaterIndex);
  res.json({timeSlots: allTimeSlots});
});

/* GET NEXT TIME SLOTS */
// router.get('/get-time-slots/:currentHrs', function(req, res, next) {
//   console.get("hererer")


  // res.json(allTimeSlots);
// });

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
    fkUserId: req.body.userId,
    pickupTimeSlot: req.body.pickupTimeSlot,
    totalValue: req.body.totalValue,
    paymentType: req.body.creditTo,
    accountId: req.body.accountId,
    requestUserName: req.body.name,
    requestSociety: req.body.society,
    requestEmail: req.body.email,
    bagSize: req.body.bagSize.size,
    requestCreated: req.body.requestCreated
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
          generateReqPIN(post._id.toString(), post);
        }
        res.json(responseObj);
      });
    }
  });
});

/* COMPLETE REQUEST PICKUP AND GET DEPOSIT */
router.post('/request-pickup/complete', function (req, res, next) {
  var newRewards = 0;
  UserModel.findById(req.body._id,
    function(err, user) {
      if(err) return next(err);
      else {
        var oldRewards = user.rewardsEarned;
        var societies = appConfig.societies;
        var isPinValid = false;
        for(var i=0; i< societies.length; i++) {
          if(societies[i].name == req.body.requestSociety) {
            if(societies[i].locationCode == req.body.pinCode) {
              isPinValid = true;
              break;
            }
          }
        }

        if(isPinValid) {
          RequestPickupModel.findById(req.body.requestId,
            function (err, requestPickup) {
              requestPickup.noOfBags = req.body.noOfBags;
              requestPickup.totalValue = req.body.totalValue;
              requestPickup.paymentType = req.body.paymentType;
              requestPickup.accountId = req.body.accountId;
              requestPickup.requestUpdated = req.body.requestUpdated;
              requestPickup.bagSize = req.body.bagSize;

              var requestRewards = requestPickup.totalValue;
              newRewards = oldRewards + requestRewards;

              user.rewardsEarned = newRewards;
              user.accountId = requestPickup.accountId;

              requestPickup.pinCode = req.body.pinCode;
              requestPickup.status = "COMPLETED";

              user.save(); //update the user's rewards
              requestPickup.save(); //update status
              res.json(newRewards);
            });
          } else {
            res.json({
              "error":"Agent PIN Code is invalid"
            });
          }


//        PickupPinModel.findOne({"requestId": req.body.requestId, randomPIN: req.body.pinCode, enabled: true},
//          function (err, pinObject) {
//
//          });
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
});


/* UPDATE GROUP OF REQUEST PICKUPS (MAJORLY CANCELLING THEM) */
router.post('/request-pickups/update', function (req, res, next) {
  var reqPickupIds = req.body._ids;
  var newStatus = req.body.status;
  RequestPickupModel.updateMany({_id: {$in: reqPickupIds}}, {$set: {"status": newStatus}},
    function (err, requestPickups) {
      res.json(requestPickups);
    });
});

//FIND REQUESTS
router.post('/requests/:status', function(req, res, next) {
  var condition = {status: req.params.status};
  if(req.params.status === "ALL" || !(req.params.status)) {
    condition = {};
  }
  if(req.body.startTime) {
    var yyyyMMdd = req.body.startTime;
    var startDate = new Date(yyyyMMdd);
    var endDate = new Date();
    endDate = new Date(endDate.setDate(startDate.getDate() + 1));
    var dateCond = {startTime: {$gte: startDate, $lte: endDate}};
    if(Object.keys(condition).length > 0) {
      condition = {$and: [condition, dateCond]}
    } else {
      condition = dateCond
    }
  }
  var sortCondition = {startTime: -1};
  if(req.params.status === "PENDING") {sortCondition = {_id : 1};}
  var $userLookup = {from: "usermodels", localField: "fkUserId", foreignField: "_id", as: "user"};
  var $pickupPinLookup = {from: "pickuppinmodels", localField: "fkPickupPinId", foreignField: "_id", as: "pickupPin"};
  RequestPickupModel.aggregate([{$match: condition}, {$lookup: $userLookup}, {$lookup: $pickupPinLookup}],
    function(err, records) {
      if(err) return next(err);
      var responseArr = [];
      var responseObj = {};
      for(var i=0; i<records.length; i++) {
        responseObj = {
          requestId: records[i]._id,
          noOfBags: records[i].noOfBags,
          startDate: records[i].startTime,
          endDate: records[i].endTime,
          pinCode: records[i].pinCode > 0 ? records[i].pinCode : getSocietyPinCode(records[i]),
          status: records[i].status,
          totalValue: records[i].totalValue,
          paymentType: records[i].paymentType,
          accountId: records[i].accountId,
          mobileNumber: records[i].user ? records[i].user[0].phoneNumber : null,
          name: records[i].requestUserName,
          society: records[i].requestSociety,
          bagSize: records[i].bagSize,
          requestCreated: records[i].requestCreated,
          requestUpdated: records[i].requestUpdated,
          email: records[i].requestEmail,
        }
        responseArr.push(responseObj);
      }
      res.json(responseArr);
    }).sort(sortCondition);
});

function getSocietyPinCode(record) {
  var societies = appConfig.societies;
  var pinCode = null;
  for(var i=0; i< societies.length; i++) {
    if(societies[i].name == record.requestSociety) {
      pinCode = societies[i].locationCode;
      break;
    }
  }
  return pinCode;
}

function generateReqPIN(requestPickupId, reqPickupObj) {
  var randomPIN = getRandom4Digit();
  PickupPinModel.create({
    requestId: requestPickupId,
    randomPIN: randomPIN,
    enabled: true
  }, function (err, post) {
    if (err) return next(err);
    reqPickupObj.fkPickupPinId = post._id;
    reqPickupObj.save();
  });
};

function getRandom4Digit() {
  return Math.floor(1000 + Math.random() * 9000);
}

function prepareTodaysSlots(nextGreaterIndex) {
  let timeSlots = [];
  let hourMappings = getHourMappings();
  for(let idx=nextGreaterIndex; idx<appConfig.givenTimeSlots.length; idx++) {
    let hour = appConfig.givenTimeSlots[idx];
    let slot = {
      id: -1,
      day: 'Today',
      startTime: hourMappings[hour],
      endTime: hourMappings[hour + appConfig.givenTimeSlotInterval]
    };
    if(slot.endTime && slot.startTime) {
      timeSlots.push(slot);
    }
  }
  return timeSlots;
}

function prepareTomorrowSlots() {
  let timeSlots = [];
  let hourMappings = getHourMappings();
  for(let givenSlot of appConfig.givenTimeSlots) {
    let slot = {
      id: -1,
      day: 'Tomorrow',
      startTime: hourMappings[givenSlot],
      endTime: hourMappings[givenSlot + appConfig.givenTimeSlotInterval]
    }
    if(slot.endTime && slot.startTime) {
      timeSlots.push(slot);
    }
  }
  return timeSlots;
}

function injectUniqueId(timeSlots) {
  let i=1;
  timeSlots.forEach(function(eachSlot) {
    eachSlot.id = i;
    i++;
  });
  return timeSlots;
}

function getHourMappings() {
  return appConfig.hourMappings
}

module.exports = router;
