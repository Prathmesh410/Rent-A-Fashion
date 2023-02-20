
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
    }
}
,{timestamps : true,}
);
module.exports = mongoose.model("Review" , reviewSchema);