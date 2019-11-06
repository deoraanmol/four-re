module.exports = {
  rewardsPerBag: 10,
  paymentTypes: [
    {name: 'PayTM'}
  ],
  societies: [
    {name: 'Ireo Grand Arch'},
    {name: 'Mahindra Lifespaces'}
  ],
  givenTimeSlots: [16, 18, 20], // 4pm to 8pm
  givenTimeSlotInterval: 2, //2 hrs interval between any 2 slots
  hourMappings: { //put the hour mapping for the slots mentioned above -- this quickly converts 24 hr format to 12 hr format
    16: "04:00 PM",
    18: "06:00 PM",
    20: "08:00 PM",
  },
  cancelRequestConstraints: {
    cannotCancelBefore: 60, //cannot cancel a request before X minutes of beginning of the time slot
    cannotCancelAfter: 60, //cannot after Y minutes of the end of the time slot
  }
}
