const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const requestSchema = new mongoose.Schema({
  borrower: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'declined'],
    default: 'requested'
  }
});

module.exports = mongoose.model('Request', requestSchema);