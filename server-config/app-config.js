module.exports = {
  paymentTypes: [
    {name: 'PayTM'}
  ],
  //configure the bag sizes below
  bagTypes: [
      {size: 'Small', display: 'Small', amountPerBag: 5},
      {size: 'Medium', display: 'Medium', amountPerBag: 10}
  ],
  //location codes will be the agent pins (todo - support firebase sms to send codes)
  societies: [
    {name: 'Grand Arch Tower No. A', locationCode: 1234},
    {name: 'Grand Arch Tower No. B', locationCode: 2345},
    {name: 'Grand Arch Tower No. C', locationCode: 3456},
    {name: 'Grand Arch Tower No. D', locationCode: 4567},
    {name: 'Grand Arch Tower No. EW', locationCode: 5678},
    {name: 'Grand Arch Tower No. WW', locationCode: 6789},
    {name: 'Grand Arch Tower No. F', locationCode: 7890},
    {name: 'Grand Arch Tower No. G', locationCode: 8901},
    {name: 'Grand Arch Tower No. H', locationCode: 9012},
    {name: 'Grand Arch Tower No. J', locationCode: 4321}
  ],
  givenTimeSlots: [16, 18, 20], // 4pm to 8pm, **use 16.5 for 4:30pm**
  givenTimeSlotInterval: 2, //2 hrs interval between any 2 slots
  hourMappings: { //put the hour mapping for the slots mentioned above -- this quickly converts 24 hr format to 12 hr format
    16: "04:00 PM",
    18: "06:00 PM",
    20: "08:00 PM",
  },
  cancelRequestConstraints: {
    cannotCancelBefore: 0, //cannot cancel a request before X minutes of beginning of the time slot
    cannotCancelAfter: 0, //cannot cancel a request after Y minutes of the end of the time slot
  },
  newRequestConstraints: {
    canRequestBefore: 60 //can raise a request X mins before a slot's start time
  }
}
