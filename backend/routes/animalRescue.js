const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const AnimalRescue = require('../models/animalRescue'); // match your filename exactly

// 📸 Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/uploads/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + '-' + file.originalname.replace(/\s+/g, '_')
    );
  },
});

const upload = multer({ storage });

// 🐾 POST route for animal rescue report
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { rescuerName, animalType, condition, location, contact } = req.body;

    const newEntry = new AnimalRescue({
      rescuerName,
      animalType,
      condition,
      location,
      contact,
      imageUrl: req.file ? req.file.path : null,
    });

    await newEntry.save();

    res.json({ message: '✅ Animal rescue reported successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Server error while saving animal rescue');
  }
});

module.exports = router;
