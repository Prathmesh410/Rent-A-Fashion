const orderSchema = new mongoose.Schema({
    products: [ProductcartSchema],
    transactionId: {},
    amount: {
      type: Number,
    },
    address: String,
    borrowerStatus: {
      type: String,
      default: "Requested",
      enum: ["Requested", "Cancelled", "Delivered", "Shipped", "Processing", "Received"],
    },
    lenderStatus: {
      type: String,
      default: "Requested",
      enum: ["Requested", "Accepted", "Declined", "Shipped", "Delivered"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  }, { timestamps: true });