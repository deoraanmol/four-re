export interface PendingPickups {
  noOfBags: Number,
  totalValue: Number,
  pickupTimeSlot: String,
  paymentType: String,
  accountId: String,
  _id: String, //requestId
  userId: String,
  startTime: String,
  endTime: String
}

export interface CompletedPickups {
  noOfBags: Number,
  totalValue: Number,
  pickupTimeSlot: String,
  paymentType: String,
  accountId: String,
  _id: String, //requestId
  userId: String,
  startTime: String,
  endTime: String
}
