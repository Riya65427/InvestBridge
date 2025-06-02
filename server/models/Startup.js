const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  category: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true }); 

module.exports = mongoose.model('Startup', StartupSchema);