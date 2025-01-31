const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'available' }, // "available" or "adopted"
});

module.exports = mongoose.model('Pet', petSchema);