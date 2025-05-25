const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');


router.post('/submit', async (req, res) => {
  try {
    const newStartup = new Startup(req.body);
    await newStartup.save();
    res.status(201).json(newStartup);
  } catch (error) {
    console.error('Error saving startup:', error);
    res.status(500).json({ error: 'Failed to submit startup' });
  }
});


router.get('/list', async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (error) {
    console.error('Error fetching startups:', error);
    res.status(500).json({ error: 'Error fetching startups' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedStartup = await Startup.findByIdAndDelete(req.params.id);
    if (!deletedStartup) {
      return res.status(404).json({ error: 'Startup not found' });
    }
    res.status(200).json({ message: 'Startup deleted successfully' });
  } catch (error) {
    console.error('Error deleting startup:', error);
    res.status(500).json({ error: 'Failed to delete startup' });
  }
});

module.exports = router;