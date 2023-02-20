const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const reviewSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviewText: {
        type: String,
        required: true,
        maxlength: 500
    },
    product: {
        type: ObjectId,
        ref: "Product",
        required: true
      },
}
,{timestamps : true,}
);
module.exports = mongoose.model("Review" , reviewSchema);