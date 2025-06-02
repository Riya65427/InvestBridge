const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/submit', authMiddleware, async (req, res) => {
    try {
        const { name, description, budget, category, contactNumber, email } = req.body;

        const newStartup = new Startup({
            name,
            description,
            budget,
            category,
            contactNumber,
            email,
            user: req.user.id 
        });

        await newStartup.save();
        res.status(201).json(newStartup);
    } catch (error) {
        console.error('Error saving startup:', error);
        res.status(500).json({ error: 'Failed to submit startup', details: error.message });
    }
});
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const startupProfile = await Startup.findOne({ user: req.user.id });
        if (!startupProfile) {
            return res.status(200).json({ name: '', description: '', budget: 0, category: '', contactNumber: '', email: '' });
        }
        const profileToSend = {
            ...startupProfile.toObject(), 
            contactInfo: startupProfile.contactNumber 
        };
        res.json(profileToSend);
    } catch (error) {
        console.error('Error fetching startup profile:', error);
        res.status(500).json({ error: 'Failed to fetch startup profile', details: error.message });
    }
});

router.put('/me', authMiddleware, async (req, res) => {
    try {
        const { name, description, budget, category, contactInfo, email } = req.body;

        let startupProfile = await Startup.findOne({ user: req.user.id });

        if (startupProfile) {
            startupProfile.name = name || startupProfile.name;
            startupProfile.description = description || startupProfile.description;
            startupProfile.budget = budget || startupProfile.budget;
            startupProfile.category = category || startupProfile.category;
            startupProfile.contactNumber = contactInfo || startupProfile.contactNumber;
            startupProfile.email = email || startupProfile.email;

            await startupProfile.save();

            const updatedProfileToSend = {
                ...startupProfile.toObject(),
                contactInfo: startupProfile.contactNumber
            };
            res.json(updatedProfileToSend);
        } else {
            return res.status(404).json({ error: 'Startup profile not found for this user to update.' });
        }
    } catch (error) {
        console.error('Error updating startup profile:', error);
        res.status(500).json({ error: 'Failed to update startup profile', details: error.message });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};

        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }

        const startups = await Startup.find(filter);
        res.json(startups);
    } catch (error) {
        console.error('Error fetching all startups:', error);
        res.status(500).json({ error: 'Failed to fetch startups', details: error.message });
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


router.delete('/:id', authMiddleware, async (req, res) => {
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