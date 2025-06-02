const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { 
    type: String,
    required: true
  },
  budget: {
    type: Number,
    default: 0
  },
  interests: {
    type: String,
    default: ''
  },
  contactInfo: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Investor', investorSchema);