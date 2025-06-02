const express = require('express');
const router = express.Router();
const Investor = require('../models/Investor');
const User = require('../models/User'); 
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const investor = await Investor.findOne({ user: req.user.id });
        if (!investor) {
            return res.status(200).json({ interests: '', budget: 0, contactInfo: '' });
        }
        res.json(investor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/me', authMiddleware, async (req, res) => {
    const { interests, budget, contactInfo } = req.body;
    const investorFields = { interests, budget, contactInfo };

    try {
        let investor = await Investor.findOne({ user: req.user.id });

        if (investor) {
            investor = await Investor.findOneAndUpdate(
                { user: req.user.id },
                { $set: investorFields },
                { new: true } 
            );
            return res.json(investor);
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        investor = new Investor({
            user: req.user.id,
            name: user.name, 
            interests,
            budget,
            contactInfo
        });
        await investor.save();
        res.status(201).json(investor); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', authMiddleware, async (req, res) => {
    const { interest, budget } = req.query;
    let query = {};

    if (interest) {
        query.interests = { $regex: interest, $options: 'i' };
    }
    if (budget) {
        query.budget = { $gte: parseInt(budget) };
    }

    try {
        const investors = await Investor.find(query).populate('user', 'name');
        res.json(investors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;