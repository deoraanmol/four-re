var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var RequestPickupModel = require('../models/RequestPickup')

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
router.put('/:id', function(req, res, next) {
  UserModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
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

/* STORE REQ PICKUP FOR USER */
router.post('/request-pickup', function (req, res, next) {
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
    pickupTimeSlot: req.body.pickupTimeSlot
  }
  UserModel.findByIdAndUpdate(req.body.userId, user, function (err, post) {
    if (err) return next(err);
    else {
      RequestPickupModel.create(reqPickup, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    }
  });
})

module.exports = router;
