const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Startup = require('../models/Startup'); 
const Investor = require('../models/Investor'); 

const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

router.get('/users', authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/startups', authMiddleware, adminOnly, async (req, res) => {
  try {
    const startups = await Startup.find().populate('user', 'name email'); 
    res.json(startups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/investors', authMiddleware, adminOnly, async (req, res) => {
  try {
    const investors = await Investor.find().populate('user', 'name email'); 
    res.json(investors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/profile/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let profileData = { user };

    if (user.role === 'investor') {
      const investorProfile = await Investor.findOne({ user: user._id });
      if (investorProfile) {
        profileData.investorProfile = investorProfile;
      }
    } else if (user.role === 'startup') {
      const startupProfile = await Startup.findOne({ user: user._id });
      if (startupProfile) {
        profileData.startupProfile = startupProfile;
      }
    }
    res.json(profileData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;