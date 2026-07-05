const express = require('express');
const router = express.Router();
const GarbageCleaner = require('../models/GarbageCleaner');

// POST route for garbage report
router.post('/', async (req, res) => {
  try {
    const { description, location } = req.body;
    const newEntry = new GarbageCleaner({
      description,
      location
    });
    await newEntry.save();
    res.json({ message: 'Garbage location reported successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
