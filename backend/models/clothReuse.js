const mongoose = require('mongoose');

const ClothReuseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clothes: { type: String, required: true },
  image: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClothDonation', ClothReuseSchema);
