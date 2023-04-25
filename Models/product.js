const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 500
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    deposite: {
        type: Number
    },
    units: {
        type: Number,
        default: 1
    },
    photos: [
        {
            data: Buffer,
            contentType: String
        }
    ],
    rent: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    lender: {
        type: ObjectId,
        ref:"User",
        required: true
    },
    requests: [
        {
            borrower: {
                type: ObjectId,
                ref: "User"
            },
            date: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ["requested", "accepted", "declined"],
                default: "requested"
            }
        }
    ],
    review: {
        type: ObjectId,
        ref: "Review"
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);

