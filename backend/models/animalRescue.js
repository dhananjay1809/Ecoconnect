const mongoose = require("mongoose");

const animalRescueSchema = new mongoose.Schema({
  rescuerName: String,
  animalType: String,
  condition: String,
  location: String,
  contact: String,
  image: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AnimalRescue", animalRescueSchema);
