const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  category: { type: String, required: true },
  contactNumber: { type: String, required: true }, 
  email: { type: String, required: true } 
});

module.exports = mongoose.model('Startup', StartupSchema);