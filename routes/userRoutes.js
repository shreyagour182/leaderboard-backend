const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// @desc GET all users
router.get('/', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// @desc POST create a new user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    console.log('Received body:', req.body); // in your POST /users route

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('User create error:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// router.post('/', async (req, res) => {
//   const user = new User({ name: req.body.name });
//   await user.save();
//   res.status(201).json(user);
// });

// @desc GET claim history for all users
router.get('/history', async (req, res) => {
  const history = await ClaimHistory.find({}).populate('userId');
  res.json(history);
});

// @desc GET claim history for a specific user
router.get('/history/:userId', async (req, res) => {
  const userId = req.params.userId;
  const history = await ClaimHistory.find({ userId }).populate('userId');
  res.json(history);
});

module.exports = router;
