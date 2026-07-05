const express = require('express');
const router = express.Router();
const multer = require('multer');
const ClothReuse = require('../models/ClothReuse');



// File storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, clothes } = req.body;
    const newEntry = new ClothDonation({
      name,
      clothes,
      image: req.file.filename
    });
    await newEntry.save();
    res.json({ message: 'Clothes submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
