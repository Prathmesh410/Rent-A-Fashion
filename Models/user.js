const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 40,
    trim: true
  },
  lastname: {
    type: String,
    required: false,
    maxlength: 40,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: String,
    enum: ['lender', 'borrower'],
    default: 'lender'
  },
  rented_products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    rentedAt: {
      type: Date,
      default: Date.now
    },
    returnedAt: Date
  }],
  added_products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);