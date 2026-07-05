const mongoose = require('mongoose');

const GarbageCleanerSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GarbageCleaner', GarbageCleanerSchema);
