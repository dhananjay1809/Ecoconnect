const mongoose = require('mongoose');

const FoodDonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  food: { type: String, required: true },
  image: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodDonation', FoodDonationSchema);
