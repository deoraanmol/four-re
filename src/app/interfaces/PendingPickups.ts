export interface PendingPickups {
  noOfBags: Number,
  totalValue: Number,
  pickupTimeSlot: String,
  paymentType: String,
  accountId: String,
  _id: String, //requestId
  userId: String,
  startTime: String,
  endTime: String,
  requestUserName: String,
  requestSociety: String,
  requestFlatNumber: String,
  requestEmail: String,
  bagSize: String
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
  endTime: String,
  bagSize: String
}
