const express = require('express');
const router = express.Router();
const multer = require('multer');
const FoodDonation = require('../models/FoodDonation');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST route for food donation
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, food } = req.body;
    const newEntry = new FoodDonation({
      name,
      food,
      image: req.file.filename
    });
    await newEntry.save();
    res.json({ message: 'Food donation submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;



